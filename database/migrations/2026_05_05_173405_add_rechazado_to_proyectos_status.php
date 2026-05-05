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
        Schema::table('proyectos', function (Blueprint $table) {
            $table->enum('estado', ['borrador', 'revision', 'publicado', 'completado', 'fallido', 'cancelado', 'rechazado'])
                  ->default('borrador')
                  ->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('proyectos', function (Blueprint $table) {
            $table->enum('estado', ['borrador', 'revision', 'publicado', 'completado', 'fallido', 'cancelado'])
                  ->default('borrador')
                  ->change();
        });
    }
};
