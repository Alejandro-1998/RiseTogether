<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Proyecto extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = "proyectos";
    protected $primaryKey = "id";

    protected $fillable = [
        'nombreProyecto',
        'descripcion',
        'financiacionObjetivo',
        'fechaCreacion',
        'fechaFinalizacion'
    ];

    function users()
    {
        return $this->belongsToMany(User::class, 'users_proyectos', 'idProyecto', 'idUsuario');
    }

    function comentarios()
    {
        return $this->belongsTo(Comentario::class);
    }

    function eventos()
    {
        return $this->belongsToMany(Evento::class, 'proyectos_eventos', 'idProyecto', 'idEvento');
    }

    function recompensas()
    {
        return $this->hasMany(Recompensa::class);
    }

    function facturas()
    {
        return $this->hasMany(Factura::class);
    }

    function donaciones()
    {
        return $this->hasMany(Donacion::class);
    }
}
