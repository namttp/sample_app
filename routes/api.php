<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('ajax')->group(function () {
    // ユーザー情報
    Route::get('me', [App\Http\Controllers\Api\UserController::class, 'me'])->name('me');

    // 診断
    Route::post('diagnoses', [App\Http\Controllers\Api\DiagnosisController::class, 'store'])->name('diagnosis.store');
    Route::post('diagnoses/{diagnosis}/kirei', [App\Http\Controllers\Api\DiagnosisController::class, 'kirei'])->name('diagnosis.kirei');
    Route::post('diagnoses/{diagnosis}/hari', [App\Http\Controllers\Api\DiagnosisController::class, 'hari'])->name('diagnosis.hari');
    Route::get('diagnoses/{diagnosis}', [App\Http\Controllers\Api\DiagnosisController::class, 'show']);

    // 認証
    Route::post('login', [App\Http\Controllers\Api\Auth\AuthenticatedSessionController::class, 'store'])
    ->middleware('guest');
    Route::post('logout', [App\Http\Controllers\Api\Auth\AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth');

});
