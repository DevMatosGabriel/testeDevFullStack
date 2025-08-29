<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\ForgotLoginController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Auth;

Route::middleware('auth')->group(function () {
    Route::resource('users', \App\Http\Controllers\UserController::class)
        ->only(['index','create','store','update','destroy']); // sem edit/show

    Route::post('/logout', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});

// raiz para login + fluxos "guest"
Route::get('/', function () {
    return redirect()->route(Auth::check() ? 'users.index' : 'login');
});
Route::middleware('guest')->group(function () {
    Route::get('/forgot-login',  [\App\Http\Controllers\Auth\ForgotLoginController::class, 'create'])->name('forgot-login');
    Route::post('/forgot-login', [\App\Http\Controllers\Auth\ForgotLoginController::class, 'store'])->name('forgot-login.store');
});

// Links do layout (opcional)
Route::view('/politica-de-privacidade', 'static.politica')->name('privacy');
Route::view('/termos-de-uso', 'static.termos')->name('terms');
Route::view('/ajuda', 'static.ajuda')->name('help');

// Rotas Breeze (/login, /register, /forgot-password, etc.)
require __DIR__.'/auth.php';
