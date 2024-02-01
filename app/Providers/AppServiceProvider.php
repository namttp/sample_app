<?php

namespace App\Providers;

use App\Auth\MyGuard;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Auth::extend('custom', function ($app, $name, array $config) {
            return new MyGuard(request(), Auth::createUserProvider($config['provider']));
        });
    }
}
