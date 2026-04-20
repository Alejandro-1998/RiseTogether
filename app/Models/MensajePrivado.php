<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MensajePrivado extends Model
{
    protected $table = 'mensajes_privados';
    protected $fillable = ['id_remitente', 'id_receptor', 'contenido', 'leido'];

    public function remitente()
    {
        return $this->belongsTo(User::class, 'id_remitente');
    }

    public function receptor()
    {
        return $this->belongsTo(User::class, 'id_receptor');
    }
}
