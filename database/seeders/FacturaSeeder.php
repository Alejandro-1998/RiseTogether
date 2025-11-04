<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Factura;

class FacturaSeeder extends Seeder
{
    public function run(): void
    {
        Factura::create([
            'numeroFactura' => 1001,
            'cif' => 'B12345678',
            'fechaFactura' => '2025-01-15',
            'costo' => 2500,
            'descripcion' => 'Factura por servicios de consultoría tecnológica.',
            'direccionFiscal' => 'Calle Ejemplo 45, Madrid, España',
            'pdf' => 'facturas/factura_1001.pdf',
        ]);

        Factura::factory(10)->create();
    }
}