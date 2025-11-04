<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Factura>
 */
class FacturaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'numeroFactura' => $this->faker->unique()->numberBetween(1000, 9999),
            'cif' => strtoupper($this->faker->bothify('A########')),
            'fechaFactura' => $this->faker->dateTimeBetween('-1 years', 'now')->format('Y-m-d'),
            'costo' => $this->faker->numberBetween(100, 5000),
            'descripcion' => $this->faker->sentence(6),
            'direccionFiscal' => $this->faker->address(),
            'pdf' => 'facturas/' . $this->faker->unique()->lexify('factura_????.pdf'),
        ];
    }
}