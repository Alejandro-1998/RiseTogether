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
}
