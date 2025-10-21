<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('donaciones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idRecompensa')->nullable();
            $table->unsignedBigInteger('idUsuario');
            $table->unsignedBigInteger('idProyecto');
            $table->date('fechaCompra');
            $table->decimal('importe');
            $table->enum('estadoDonacion', ['pendiente', 'pagada', 'fallida', 'reembolsada'])->default('pendiente');
            $table->timestamps();

            $table->foreign('idRecompensa')->references('id')->on('recompensas');
            $table->foreign('idUsuario')->references('id')->on('users');
            $table->foreign('idProyecto')->references('id')->on('proyectos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donaciones');
    }
};
