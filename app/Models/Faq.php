<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    protected $fillable = ['proyecto_id', 'pregunta', 'respuesta'];

    public function proyecto()
    {
        return $this->belongsTo(Proyecto::class);
    }
}
