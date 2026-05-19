<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Proyecto;
use App\Models\Comentario;
use App\Models\Categoria;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ComentarioModeracionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Create standard categories, project, and user for comments
        \Spatie\Permission\Models\Role::create(['name' => 'admin']);

        $this->user = User::factory()->create();
        $this->admin = User::factory()->create();
        $this->admin->assignRole('admin');

        $this->categoria = Categoria::create(['nombre' => 'Tecnología', 'slug' => 'tecnologia']);
        $this->proyecto = Proyecto::create([
            'titulo' => 'Proyecto de Prueba',
            'slug' => 'proyecto-de-prueba',
            'descripcion' => 'Descripción',
            'user_id' => $this->user->id,
            'categoria_id' => $this->categoria->id,
            'objetivo_financiacion' => 1000,
            'cantidad_recaudada' => 0,
            'estado' => 'publicado',
            'fecha_limite' => now()->addDays(10),
        ]);
    }

    public function test_new_comment_is_approved_by_default()
    {
        $response = $this->actingAs($this->user)
            ->postJson('/api/comentarios', [
                'idProyecto' => $this->proyecto->id,
                'mensaje' => 'Este es un comentario limpio y correcto.',
                'fechaHora' => now()->toDateTimeString(),
            ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('comentarios', [
            'mensaje' => 'Este es un comentario limpio y correcto.',
            'estado' => 'aprobado',
        ]);
    }

    public function test_user_can_report_comment()
    {
        $comentario = Comentario::create([
            'idUsuario' => $this->user->id,
            'idProyecto' => $this->proyecto->id,
            'mensaje' => 'Comentario reportable.',
            'fechaHora' => now()->toDateTimeString(),
            'estado' => 'aprobado',
        ]);

        $response = $this->actingAs($this->user)
            ->postJson("/api/comentarios/{$comentario->id}/reportar");

        $response->assertStatus(200);
        $this->assertDatabaseHas('comentarios', [
            'id' => $comentario->id,
            'estado' => 'pendiente',
        ]);
    }

    public function test_admin_can_approve_reported_comment()
    {
        $comentario = Comentario::create([
            'idUsuario' => $this->user->id,
            'idProyecto' => $this->proyecto->id,
            'mensaje' => 'Comentario reportado.',
            'fechaHora' => now()->toDateTimeString(),
            'estado' => 'pendiente',
        ]);

        // Simulating admin user using actingAs with admin role
        $response = $this->actingAs($this->admin)
            ->putJson("/api/admin/comentarios/{$comentario->id}/estado", [
                'estado' => 'aprobado',
            ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('comentarios', [
            'id' => $comentario->id,
            'estado' => 'aprobado',
            'mensaje' => 'Comentario reportado.', // Message unchanged
        ]);
    }

    public function test_admin_can_reject_reported_comment_and_replace_text()
    {
        $comentario = Comentario::create([
            'idUsuario' => $this->user->id,
            'idProyecto' => $this->proyecto->id,
            'mensaje' => 'Comentario con contenido inaceptable.',
            'fechaHora' => now()->toDateTimeString(),
            'estado' => 'pendiente',
        ]);

        $response = $this->actingAs($this->admin)
            ->putJson("/api/admin/comentarios/{$comentario->id}/estado", [
                'estado' => 'rechazado',
            ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('comentarios', [
            'id' => $comentario->id,
            'estado' => 'rechazado',
            'mensaje' => 'Mensaje eliminado por un administrador',
        ]);
    }
}
