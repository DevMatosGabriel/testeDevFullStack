<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        // Model::class => Policy::class,
    ];

    public function boot(): void
    {
        // Níveis: 1=Admin, 2=Moderador, 3=Leitor
        Gate::define('users.view',   fn (User $u) => in_array($u->role, [User::ROLE_ADMIN, User::ROLE_MOD, User::ROLE_VIEW]));
        Gate::define('users.edit',   fn (User $u) => in_array($u->role, [User::ROLE_ADMIN, User::ROLE_MOD]));
        Gate::define('users.delete', fn (User $u) => $u->role === User::ROLE_ADMIN);
    }
}
