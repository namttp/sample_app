<?php

namespace App\Http\Requests\Auth;

use App\Models\LoginLockout;
use App\Models\LoginAttempt;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Cookie;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'uid' => ['required', 'string'],
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate()
    {
        //$this->ensureIsNotRateLimited();
    
        $guard = 'users';
    
        $credentials = $this->only('uid', 'password');
        $remember = $this->boolean('remember');

        // ロック中
        $lock = LoginLockout::getLock($this->input('uid'), request()->ip());
        if( $lock )
        {
            throw ValidationException::withMessages([
                'uid' => __('auth.failed'),
                'isLock' => true,
                'until' => $lock->until,
            ]);
        }
    
        if (! Auth::guard($guard)->attempt($credentials, $remember)) {
            RateLimiter::hit($this->throttleKey());
    
            LoginAttempt::create([
                'uid' => $this->input('uid'), // ログイン試行時の入力値を保存する
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
                'status' => false,
            ]);

            $lock = null;
            if( LoginAttempt::isLock($this->input('uid'), request()->ip()) )
            {
                //Cookie::queue('isLock', 'true', LoginAttempt::$LOCKOUT_DURATION, null, null, false, false);
                $lock = LoginLockout::create([
                    'uid' => $this->input('uid'), // ログイン試行時の入力値を保存する
                    'ip_address' => request()->ip(),
                    'user_agent' => request()->userAgent(),
                    'until' => now()->addMinutes(LoginAttempt::$LOCKOUT_DURATION),
                ]);
            }

            throw ValidationException::withMessages([
                'uid' => __('auth.failed'),
                'isLock' => $lock ? true : false,
                'until' => $lock ? $lock->until : ''
            ]);
        }
    
        RateLimiter::clear($this->throttleKey());
    
        // ログイン試行成功時の処理
        LoginAttempt::create([
            'uid' => $this->input('uid'), // ログイン試行時の入力値を保存する
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'status' => true,
        ]);
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited()
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'uid' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     *
     * @return string
     */
    public function throttleKey()
    {
        return Str::transliterate(Str::lower($this->input('uid')).'|'.$this->ip());
    }
}
