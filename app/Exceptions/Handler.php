<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Support\Facades\Log;

class Handler extends ExceptionHandler
{
    protected $levels = [];

    protected $dontReport = [];

    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        if ($exception instanceof TokenMismatchException) {
            Log::error('CSRF Token Mismatch', [
                'url' => $request->fullUrl(),
                'method' => $request->method(),
                'session_token' => $request->hasSession() ? $request->session()->token() : null,
                'input_token' => $request->input('_token'),
                'header_token' => $request->header('X-CSRF-TOKEN'),
                'cookie_token' => $request->cookie('XSRF-TOKEN'),
            ]);
        }

        return parent::render($request, $exception);
    }
}
