<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProyectoActualizacion extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'proyecto_actualizaciones';

    protected $fillable = [
        'idProyecto',
        'titulo',
        'contenido',
    ];

    public function proyecto()
    {
        return $this->belongsTo(Proyecto::class, 'idProyecto');
    }

    public function comentarios()
    {
        return $this->hasMany(Comentario::class, 'idActualizacion');
    }
}
