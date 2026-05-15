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
        'direccionFiscal',
        'pdf',
        'proyecto_id',
        'user_id',
        'estado'
    ];

    public function proyecto()
    {
        return $this->belongsTo(Proyecto::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
