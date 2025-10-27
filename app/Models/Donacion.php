<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Donacion extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = "donaciones";
    protected $primaryKey = "id";

    protected $fillable = [
        'idRecompensa',
        'idUsuario',
        'idProyecto',
        'fechaCompra',
        'importe',
        'estadoDonacion'
    ];

    function proyectos()
    {
        return $this->belongsTo(Proyecto::class);
    }

    function users()
    {
        return $this->belongsTo(User::class);
    }

    function recompensas()
    {
        return $this->belongsTo(Recompensa::class);
    }
}
