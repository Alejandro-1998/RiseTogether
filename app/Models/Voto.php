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
        'idProyetoEvento',
        'fechaVoto'
    ];
}
