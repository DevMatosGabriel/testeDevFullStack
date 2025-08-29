<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\ForgotLoginController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\UserController;
use Illuminate\Session\TokenMismatchException;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// 🌐 Rotas públicas (sem autenticação)
Route::middleware('guest')->group(function () {
    Route::get('/', fn() => redirect()->route('login'));

    Route::get('/forgot-login',  [ForgotLoginController::class, 'create'])->name('forgot-login');
    Route::post('/forgot-login', [ForgotLoginController::class, 'store'])->name('forgot-login.store');
});

// 🔒 Rotas autenticadas
Route::middleware('auth')->group(function () {
    Route::get('/', fn() => redirect()->route('users.index'));

    Route::resource('users', UserController::class)->only([
        'index', 'create', 'store', 'update', 'destroy'
    ]);

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

// 📄 Páginas estáticas (visíveis a todos)
Route::view('/politica-de-privacidade', 'static.politica')->name('privacy');
Route::view('/termos-de-uso', 'static.termos')->name('terms');
Route::view('/ajuda', 'static.ajuda')->name('help');



Route::get('/test-csrf', function () {
    throw new TokenMismatchException('Simulated CSRF token mismatch');
});

// 🔧 Teste real de CSRF com POST (sem token válido)
Route::get('/test-csrf-form', function () {
    return <<<HTML
        <form method="POST" action="/test-csrf-form">
            <!-- Não inclui @csrf de propósito -->
            <button type="submit">Enviar sem CSRF</button>
        </form>
    HTML;
});

Route::post('/test-csrf-form', function () {
    return 'Você não deveria ver esta mensagem, pois o CSRF deve falhar.';
});

Route::get('/log-test', function () {
    \Illuminate\Support\Facades\Log::info('🚨 Teste manual de log funcionando!');
    return 'Log gravado';
});


// 🔐 Rotas Breeze
require __DIR__.'/auth.php';
