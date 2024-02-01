<?php

namespace App\Auth;

use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Support\Str;

class CustomEloquentUserProvider extends EloquentUserProvider
{
    // rememberToken認証のやつ
    public function retrieveByToken($identifier, $token)
    {
        $model = $this->createModel();

        $model = $model->where($model->getAuthIdentifierName(), $identifier)
                        ->where('disable', 0)   // disable指定を追加
                        ->first();

        if (! $model) {
            return;
        }

        $rememberToken = $model->getRememberToken();

        return $rememberToken && hash_equals($rememberToken, $token) ? $model : null;
    }

    // ログイン時のやつ
    public function retrieveByCredentials(array $credentials)
    {
        if (empty($credentials) ||
           (count($credentials) === 1 &&
            array_key_exists('password', $credentials))) {
            return;
        }

        $query = $this->createModel()->newQuery();

        foreach ($credentials as $key => $value) {
            if (! Str::contains($key, 'password')) {
                $query->where($key, $value);
            }
        }

        // disable指定を追加
        return $query->where('disable', 0)->first();
    }
}
