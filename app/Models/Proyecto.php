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
        'user_id',
        'categoria_id',
        'titulo',
        'slug',
        'resumen',
        'descripcion',
        'imagen_portada',
        'video_url',
        'objetivo_financiacion',
        'cantidad_recaudada',
        'fecha_limite',
        'estado',
    ];

    function users()
    {
        return $this->belongsToMany(User::class, 'users_proyectos', 'idProyecto', 'idUsuario');
    }

    function comentarios()
    {
        return $this->belongsTo(Comentario::class);
    }

    function eventos()
    {
        return $this->belongsToMany(Evento::class, 'proyectos_eventos', 'idProyecto', 'idEvento');
    }

    function recompensas()
    {
        return $this->hasMany(Recompensa::class);
    }

    function facturas()
    {
        return $this->hasMany(Factura::class);
    }

    function donaciones()
    {
        return $this->hasMany(Donacion::class);
    }

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function getPorcentajeFinanciadoAttribute()
    {
        // Evitar división por cero
        if ((float) $this->objetivo_financiacion <= 0) {
            return 0;
        }
        
        // Calculamos el porcentaje real (puede ser mayor a 100)
        $porcentaje = ($this->cantidad_recaudada / $this->objetivo_financiacion) * 100;
        
        return $porcentaje; // Quitamos el min(..., 100) de aquí
    }
}
