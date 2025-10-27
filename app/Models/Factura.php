<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Factura extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = "facturas";
    protected $primaryKey = "id";

    protected $fillable = [
        'numeroFactura',
        'cif',
        'fechaFactura',
        'costo',
        'descripcion',
        'descripcionFiscal',
        'pdf'
    ];

    function proyectos()
    {
        return $this->belongsTo(Proyecto::class);
    }
}
