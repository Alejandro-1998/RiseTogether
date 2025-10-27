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
}
