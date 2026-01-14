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
        'estado',
        'estrellas'
    ];

    function user()
    {
        return $this->belongsTo(User::class, 'idUsuario');
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

    public function estrellasRecibidas()
    {
        return $this->hasMany(ComentarioEstrella::class, 'comentario_id');
    }
}
