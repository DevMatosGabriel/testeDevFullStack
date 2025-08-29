<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Support\Facades\Log;

class VerifyCsrfToken extends Middleware
{
    protected $except = [
        // Exemplo: 'webhook/*'
    ];

    public function handle($request, \Closure $next)
    {
        try {
            return parent::handle($request, $next);
        } catch (TokenMismatchException $e) {
            Log::error('CSRF token mismatch detected in handle()', [
                'url' => $request->fullUrl(),
                'method' => $request->method(),
                'session_token' => $request->hasSession() ? $request->session()->token() : null,
                'input_token' => $request->input('_token'),
                'header_token' => $request->header('X-CSRF-TOKEN'),
                'cookie_token' => $request->cookie('XSRF-TOKEN'),
            ]);

            throw $e; // deixa Laravel continuar o fluxo normal (retornar 419)
        }
    }
}
