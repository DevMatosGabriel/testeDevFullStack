<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }


    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Compartilha dados globais com o Inertia (React)
        Inertia::share([
            'auth' => function () {
                $u = Auth::user();
                return [
                    'user' => $u ? [
                        'id'    => $u->id,
                        'nome'  => $u->name,
                        'cpf'   => $u->cpf,    // já normalizado
                        'email' => $u->email,
                        'role'  => $u->role,   // 1=Admin, 2=Moderador, 3=Leitor
                    ] : null,
                ];
            },
            'flash' => fn () => [
                'status'  => session('status'),
                'success' => session('success'),
                'error'   => session('error'),
            ],
            // acessível direto nas páginas (compatível com Breeze)
            'status' => fn () => session('status'),
        ]);
    }
}
