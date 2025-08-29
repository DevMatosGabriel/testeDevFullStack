<?php


namespace Database\Seeders;


use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class AdminUserSeeder extends Seeder
{
public function run(): void
{
User::firstOrCreate(['email' => 'admin@admin.com'], [
'name' => 'Admin',
'cpf' => '0',
'data_nascimento' => '2001-10-10',
'password' => Hash::make('admin123'),
'role' => User::ROLE_ADMIN,
]);
}
}
