<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comentario extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = "comentarios";
    protected $primaryKey = "id";

    protected $fillable = [
        'idUsuario',
        'idProyecto',
        'idComentario',
        'mensaje',
        'fechaHora',
        'estado'
    ];

    function users()
    {
        return $this->belongsTo(User::class);
    }

    function comentariosRespuesta()
    {
        return $this->hasMany(Comentario::class, 'idComentario');
    }

    function comentariosPadre()
    {
        return $this->belongsTo(Comentario::class, 'idComentario');
    }

    function proyectos()
    {
        return $this->hasMany(Proyecto::class);
    }
}
