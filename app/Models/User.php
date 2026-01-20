<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $table = "users";
    protected $primaryKey = "id";

    protected $fillable = [
        'dni',
        'nombreUsuario',
        'nombreCompleto',
        'email',
        'password',
        'fechaNacimiento',
        'direccion',
        'numeroCuenta',
        'biografia',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    function proyectosCreados()
    {
        return $this->hasMany(Proyecto::class, 'user_id');
    }

    function proyectos()
    {
        return $this->belongsToMany(Proyecto::class, 'users_proyectos', 'idUsuario', 'idProyecto');
    }

    function comentarios()
    {
        return $this->hasMany(Comentario::class);
    }

    function votos()
    {
        return $this->hasMany(Voto::class);
    }

    function donaciones()
    {
        return $this->hasMany(Donacion::class, 'idUsuario');
    }
}
