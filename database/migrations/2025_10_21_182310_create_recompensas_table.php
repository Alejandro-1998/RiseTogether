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
        Schema::create('recompensas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idProyecto');
            $table->string('nombreRecompensa');
            $table->decimal('costoRecompensa');
            $table->text('descripcionRecompensa');
            $table->enum('tipoEntrega', ['digital', 'fisica', 'mixta', 'desbloqueo'])->default('fisica');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('idProyecto')->references('id')->on('proyectos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recompensas');
    }
};
