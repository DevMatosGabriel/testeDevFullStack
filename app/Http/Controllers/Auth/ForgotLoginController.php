<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\ForgotLoginNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ForgotLoginController extends Controller
{
    public function create()
    {
        // Em minúsculo, pois seu projeto usa resources/js/pages
        return Inertia::render('auth/forgotlogin');
    }

    public function store(Request $request)
    {
        $data = $request->validate(['email' => ['required','email']]);

        $user = User::where('email', $data['email'])->first();

        if ($user) {
            $user->notify(new ForgotLoginNotification($user));
        }

        return back()->with('status', 'Se este e-mail estiver cadastrado, enviaremos seu CPF.');
    }
}
