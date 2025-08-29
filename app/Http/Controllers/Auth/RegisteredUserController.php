<?php


namespace App\Http\Controllers\Auth;


use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;


class RegisteredUserController extends Controller
{
public function create()
{
return inertia('Auth/Register');
}


public function store(Request $request)
{
$data = $request->validate([
'nome' => ['required', 'string', 'max:255'],
'cpf' => ['required', 'string', 'regex:/^\D*\d{11}\D*$/', 'unique:users,cpf'],
'data_nascimento' => ['nullable', 'date'],
'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)],
'password' => ['required', 'confirmed', 'min:8'],
'role' => ['nullable', 'integer', Rule::in([1,2,3])],
]);


$user = User::create([
'nome' => $data['nome'],
'name' => $data['nome'], // compatibilidade com layouts antigos
'cpf' => $data['cpf'],
'data_nascimento' => $data['data_nascimento'] ?? null,
'email' => $data['email'],
'password' => $data['password'],
'role' => $data['role'] ?? User::ROLE_VIEW,
]);


event(new Registered($user));
Auth::login($user);


return redirect()->intended(route('users', absolute: false));
}
}
