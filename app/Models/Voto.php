<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Voto extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = "votos";
    protected $primaryKey = "id";

    protected $fillable = [
        'idUsuario',
        'idProyectoEvento',
        'fechaVoto'
    ];

    function users()
    {
        return $this->belongsTo(User::class);
    }

    function proyectos()
    {
        return $this->belongsToMany(Proyecto::class, 'proyectos_eventos', 'id', 'idProyecto', 'idProyectoEvento', 'id')->withPivot('idEvento');
    }

    function evento()
    {
        return $this->belongsToMany(Evento::class,'proyectos_eventos','id','idEvento','idProyectoEvento','id')->withPivot('idProyecto');
    }
}
