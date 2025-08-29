<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('users.view');

        $search = trim((string) $request->get('q', ''));

        $users = User::query()
            ->when($search, function ($q) use ($search) {
                $digits = preg_replace('/\D+/', '', $search);
                $q->where(function ($w) use ($search, $digits) {
                    $w->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('cpf', 'like', "%{$digits}%");
                });
            })
            ->orderBy('name')
            ->get(['id','name','email','cpf','role','data_nascimento']);

        $me = $request->user();

        return Inertia::render('users/index', [
            'users' => $users->map(function ($u) use ($me) {
                $canEdit   = Gate::forUser($me)->allows('users.edit')
                              && !($u->role === User::ROLE_ADMIN && $me->role !== User::ROLE_ADMIN);
                $canDelete = Gate::forUser($me)->allows('users.delete') && $u->id !== $me->id;

                return [
                    'id'               => $u->id,
                    'name'             => $u->name,
                    'email'            => $u->email,
                    'cpf'              => $u->cpf_formatado,                 // para exibir
                    'cpf_raw'          => (string) $u->cpf,                  // <- NOVO: só dígitos
                    'role'             => (int) $u->role,
                    'data_nascimento'  => optional($u->data_nascimento)->format('Y-m-d'),
                    'can'              => ['edit' => $canEdit, 'delete' => $canDelete],
                ];
            }),
            'can' => ['create' => Gate::allows('users.edit')],
        ]);
    }

    public function create(Request $request)
    {
        Gate::authorize('users.edit');

        return Inertia::render('users/create', [
            'can' => ['create' => Gate::allows('users.edit')],
        ]);
    }

    public function store(Request $request)
    {
        Gate::authorize('users.edit');

        // normaliza CPF (remove máscara)
        $request->merge(['cpf' => preg_replace('/\D+/', '', (string) $request->cpf)]);

        $data = $request->validate([
            'name'            => ['required','string','max:255'],
            'cpf'             => ['required','digits:11','unique:users,cpf'],
            'email'           => ['required','string','email','max:255'],
            'password'        => ['required','string','min:8','confirmed'],
            'data_nascimento' => ['required','date'],
            'role'            => ['required','integer', Rule::in([1,2,3])],
        ]);

        User::create([
            'name'            => $data['name'],
            'cpf'             => $data['cpf'],
            'email'           => $data['email'],
            'data_nascimento' => $data['data_nascimento'], // model formata para Y-m-d
            'password'        => Hash::make($data['password']),
            'role'            => (int) $data['role'],
        ]);

        return redirect()->route('users.index')->with('success', 'Usuário criado com sucesso!');
    }

    public function update(Request $request, User $user)
    {
        Gate::authorize('users.edit');

        // não permitir rebaixar/salvar admin por não-admin
        if ($user->role === User::ROLE_ADMIN && $request->user()->role !== User::ROLE_ADMIN) {
            abort(403);
        }

        // só normaliza cpf se veio no request
        if ($request->filled('cpf')) {
            $request->merge(['cpf' => preg_replace('/\D+/', '', (string) $request->cpf)]);
        }

        $data = $request->validate([
            'name'            => ['required','string','max:255'],
            'cpf'             => ['nullable','digits:11', Rule::unique('users','cpf')->ignore($user->id)], // <- opcional
            'email'           => ['required','string','email','max:255'],
            'data_nascimento' => ['nullable','date'],
            'role'            => ['required','integer', Rule::in([1,2,3])],
            'password'        => ['nullable','string','min:8','confirmed'],
        ]);

        $payload = [
            'name'  => $data['name'],
            'email' => $data['email'],
            'role'  => (int) $data['role'],
        ];

        if (!empty($data['data_nascimento'])) {
            $payload['data_nascimento'] = $data['data_nascimento'];
        }
        if (!empty($data['cpf'])) { // só atualiza CPF se veio e passou na validação
            $payload['cpf'] = $data['cpf'];
        }

        $user->fill($payload);

        if (!empty($data['password'])) {
            $user->password = Hash::make($data['password']);
        }

        $user->save();

        return back()->with('success', 'Usuário atualizado!');
    }

    public function destroy(Request $request, User $user)
    {
        Gate::authorize('users.delete');

        if ($user->id === $request->user()->id) {
            return back()->with('error', 'Você não pode excluir a si mesmo.');
        }

        $user->delete();

        return back()->with('success', 'Usuário excluído!');
    }
}
