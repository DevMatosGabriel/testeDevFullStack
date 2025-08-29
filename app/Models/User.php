<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    public const ROLE_ADMIN = 1;
    public const ROLE_MOD   = 2;
    public const ROLE_VIEW  = 3;

    protected $fillable = [
        'name',
        'cpf',
        'data_nascimento',
        'email',
        'password',
        'role',
    ];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'data_nascimento'   => 'date:Y-m-d',      // sem hora
        'role'              => 'integer',
        'password'          => 'hashed',
        'created_at'        => 'datetime:Y-m-d H:i:s',
        'updated_at'        => 'datetime:Y-m-d H:i:s',
    ];

    /** Normaliza CPF (mantém só dígitos) */
    public function setCpfAttribute($v): void
    {
        $this->attributes['cpf'] = preg_replace('/\D+/', '', (string) $v);
    }

    /** Garante que sempre salve apenas YYYY-MM-DD */
    public function setDataNascimentoAttribute($v): void
    {
        $this->attributes['data_nascimento'] = $v
            ? Carbon::parse($v)->format('Y-m-d')
            : null;
    }

    /** Exposição útil no JSON */
    protected $appends = ['cpf_formatado'];

    public function getCpfFormatadoAttribute(): string
    {
        $c = str_pad((string) ($this->attributes['cpf'] ?? ''), 11, '0', STR_PAD_LEFT);
        return substr($c,0,3).'.'.substr($c,3,3).'.'.substr($c,9,2);
    }

    public function isAdmin(): bool  { return $this->role === self::ROLE_ADMIN; }
    public function isMod(): bool    { return $this->role === self::ROLE_MOD; }
    public function isViewer(): bool { return $this->role === self::ROLE_VIEW; }
}
