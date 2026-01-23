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
    Schema::create('proyectos', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        $table->foreignId('categoria_id')->constrained('categorias')->restrictOnDelete();
        $table->string('titulo');
        $table->string('slug')->unique();
        $table->longText('descripcion');
        $table->string('imagen_portada')->nullable();
        $table->string('video_url')->nullable();
        $table->decimal('objetivo_financiacion', 12, 2); 
        $table->decimal('cantidad_recaudada', 12, 2)->default(0);
        $table->dateTime('fecha_limite');
        $table->enum('estado', ['borrador', 'revision', 'publicado', 'completado', 'fallido', 'cancelado'])->default('borrador');
        $table->boolean('ganadorEvento')->default(false);
        $table->timestamps();
        $table->softDeletes();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proyectos');
    }
};
