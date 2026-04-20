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
        Schema::create('usuarios_seguidores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_seguidor')->constrained('users')->onDelete('cascade');
            $table->foreignId('id_seguido')->constrained('users')->onDelete('cascade');
            $table->timestamps();

            // Evitar duplicados
            $table->unique(['id_seguidor', 'id_seguido']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios_seguidores');
    }
};
