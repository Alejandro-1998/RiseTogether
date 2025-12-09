<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Categoria extends Model
{
    use HasFactory, Notifiable;

    protected $table = "categorias";
    protected $primaryKey = "id";

    protected $fillable = [
        'nombre',
        'slug',
        'icono'
    ];

    public function proyectos()
    {
        return $this->hasMany(Proyecto::class);
    }
}