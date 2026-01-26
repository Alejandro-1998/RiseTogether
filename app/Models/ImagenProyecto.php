<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class ImagenProyecto extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = "imagenes_proyectos";
    protected $primaryKey = "id";
    protected $fillable = [
        'proyecto_id',
        'imagen_portada',
    ];

    function proyectos()
    {
        return $this->belongsTo(Proyecto::class);
    }
}
