<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\LoginAttempt;
use App\Models\LoginLockout;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class AuthControllerTest extends TestCase
{
    use DatabaseMigrations;

    public function setup(): void
    {
        parent::setUp();
        $data = [
            ["SA001","E9712790"],
            ["SA002","Y1753659"],
            ["SA003","D4772139"],
            ["SA004","H0703793"],
            ["SA005","Y7081147"]
        ];
        foreach( $data as $value ) {
            User::create([
                'uid' => $value[0],
                'password' => Hash::make($value[1]),
            ]);
        }

        // throttleによるロックを無効化
        $this->withoutMiddleware(\App\Http\Middleware\ThrottleRequests::class);
        config(['auth.throttle.max_attempts' => 30]);
    }

    /** @test */
    public function 正常のログイン()
    {
       $response = $this->postAjax(
           action('App\Http\Controllers\Api\Auth\AuthenticatedSessionController@store'),
           [
               'uid' => 'SA001',
               'password' => 'E9712790',
           ]
       );
       $response->assertStatus(200);
    }

    /** @test */
    public function 異なるパスワードでログインできない()
    {
        $response = $this->postAjax(
            action('App\Http\Controllers\Api\Auth\AuthenticatedSessionController@store'),
            [
                'uid' => 'SA001',
                'password' => 'E9712791',
            ]
        );

        // body
        $response->assertStatus(422);
    }

    /** @test */
    public function MAX_ATTEMPTSまでは失敗が可能()
    {
        $this->withoutMiddleware(\Illuminate\Auth\Middleware\ThrottleRequests::class);

        // isLockはfalse
        for( $i = 1; $i < LoginAttempt::MAX_ATTEMPTS; $i++ ) {
            \Log::info("i:{$i}");
            $response = $this->postAjax(
                action('App\Http\Controllers\Api\Auth\AuthenticatedSessionController@store'),
                [
                    'uid' => 'SA003',
                    'password' => 'E9712791',
                ]
            );
            $response->assertStatus(422);
            $response->assertJson([
                'isLock' => [false],
            ]);
        }
        // 再度実行するとisLockがtrue
        for( $i = 1; $i < LoginAttempt::MAX_ATTEMPTS; $i++ ) {
            $response = $this->postAjax(
                action('App\Http\Controllers\Api\Auth\AuthenticatedSessionController@store'),
                [
                    'uid' => 'SA003',
                    'password' => 'E9712791',
                ]
            );
            $response->assertStatus(422);
            $response->assertJson([
                'isLock' => [true],
            ]);
        }
        // 失敗の履歴やロックの期限を過去にする
        LoginLockout::where('uid', 'SA003')->update(['until' => now()->subMinutes(LoginAttempt::$LOCKOUT_DURATION + 1)]);
        LoginAttempt::where('uid', 'SA003')->update(['created_at' => now()->subMinutes(LoginAttempt::$LOCKOUT_DURATION + 1)]);

        // isLockがfalseになる
        $response = $this->postAjax(
            action('App\Http\Controllers\Api\Auth\AuthenticatedSessionController@store'),
            [
                'uid' => 'SA003',
                'password' => 'E9712791',
            ]
        );
        $response->assertStatus(422);
        $response->assertJson([
            'isLock' => [false],
        ]);
    }

}
