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
        Schema::create('proyectos_eventos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idProyecto');
            $table->unsignedBigInteger('idEvento');
            $table->timestamps();
            $table->softDeletes();
            $table->unique(['idProyecto', 'idEvento']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proyectos_eventos');
    }
};
