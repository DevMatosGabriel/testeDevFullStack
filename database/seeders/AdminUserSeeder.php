<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin',
                'email' => 'admin@admin.com',
                'cpf' => '00000000000',
                'data_nascimento' => '2001-10-10',
                'password' => Hash::make('admin123'),
                'role' => User::ROLE_ADMIN,
            ],
            [
                'name' => 'Moderador',
                'email' => 'moderador@teste.com',
                'cpf' => '11111111111',
                'data_nascimento' => '2002-02-02',
                'password' => Hash::make('moderador123'),
                'role' => User::ROLE_MOD,
            ],
            [
                'name' => 'Leitor',
                'email' => 'leitor@teste.com',
                'cpf' => '22222222222',
                'data_nascimento' => '2003-03-03',
                'password' => Hash::make('leitor123'),
                'role' => User::ROLE_VIEW,
            ],
        ];

        foreach ($users as $data) {
            User::firstOrCreate(
                ['email' => $data['email']], // evita duplicar pelo email
                $data
            );
        }
    }
}
