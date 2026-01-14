<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComentarioEstrella extends Model
{
    use HasFactory;

    protected $table = 'comentario_estrellas';

    protected $fillable = [
        'user_id',
        'comentario_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comentario()
    {
        return $this->belongsTo(Comentario::class);
    }
}
