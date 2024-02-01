<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/healthcheck', App\Http\Controllers\HealthCheckResultsController::class);

// Lab
Route::get('/lab', function () {
    $title = '検証用';
    $description = '';

    return view('index', compact('title', 'description'));
});

// トップ
Route::get('/', function () {
    $title = 'skindiagnosis-survey';
    $description = '';

    return view('index', compact('title', 'description'));
});

// サインイン
Route::get('/signin', function () {
    $title = 'ログイン | skindiagnosis-survey';
    $description = '';

    return view('index', compact('title', 'description'));
});

// 撮影画面
Route::get('/diagnosis', function () {
    $title = '診断 | skindiagnosis-survey';
    $description = '';

    return view('index', compact('title', 'description'));
});

// すべての結果を表示する画面
Route::get('/result', function () {
    $title = '結果 | skindiagnosis-survey';
    $description = '';

    return view('index', compact('title', 'description'));
});

Route::get('/{any}', function () {
    // トップにリダイレクト
    return redirect('/');
})->where('any', '.*');
