<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Proyecto;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Exception;

class ProyectoController extends Controller
{
    /**
     * Obtiene todos los proyectos.
     */
    public function index(Request $request)
    {
        $query = Proyecto::with(['categoria', 'user']);

        if ($request->has('categoria_id')) {
            $query->where('categoria_id', $request->categoria_id);
        }

        if ($request->has('titulo')) {
             $query->where('titulo', 'like', '%' . $request->titulo . '%');
        }

        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->has('ids')) {
             $ids = explode(',', $request->ids);
             $query->whereIn('id', $ids);
        }

        // Filtro para usuarios públicos: solo mostrar estados públicos
        // Asumiendo que esta ruta es pública (no auth)
        $query->whereIn('estado', ['publicado', 'completado', 'fallido']);

        $proyectos = $query->get();
        return response()->json($proyectos);
    }

    /**
     * Obtiene todos los proyectos para admin (incluyendo creador).
     */
    public function indexAdmin()
    {
        // Eager load creator (user) and category for admin display
        $proyectos = Proyecto::with(['user', 'categoria'])->orderBy('created_at', 'desc')->get();
        return response()->json($proyectos);
    }

    /**
     * Muestra el formulario.
     */
    public function create()
    {
        $categorias = Categoria::all();
        return view('privado.crear_proyecto', compact('categorias'));
    }

    /**
     * Guarda el proyecto en la BBDD.
     */
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|max:255|unique:proyectos,titulo',
            'categoria_id' => 'required|exists:categorias,id',
            'imagen_portada' => 'required|image|max:2048',
            'objetivo_financiacion' => 'required|numeric|min:1',
            'fecha_limite' => 'required|date|after:today',
            'descripcion' => 'required',
        ], [
            'titulo.required' => 'El proyecto necesita un nombre.',
            'titulo.unique' => 'Este nombre de proyecto ya está pillado.',
            'categoria_id.required' => 'Elige una categoría.',
            'categoria_id.exists' => 'Esa categoría no es válida.',
            'imagen_portada.required' => 'La imagen es obligatoria para atraer mecenas.',
            'imagen_portada.image' => 'El archivo debe ser una imagen.',
            'imagen_portada.max' => 'La imagen no puede pesar más de 2MB.',
            'objetivo_financiacion.required' => 'Define cuánto dinero necesitas.',
            'objetivo_financiacion.min' => 'El objetivo debe ser positivo.',
            'fecha_limite.required' => 'Pon una fecha límite.',
            'fecha_limite.after' => 'La fecha límite debe ser futura.',
            'descripcion.required' => 'La descripción completa es vital.',
        ]);

        try {
            DB::beginTransaction();

            $rutaImagen = null;
            if ($request->hasFile('imagen_portada')) {
                $rutaImagen = $request->file('imagen_portada')->store('proyectos', 'public');
            }

            $proyecto = Proyecto::create([
                'user_id' => Auth::id(),
                'categoria_id' => $request->categoria_id,
                'titulo' => $request->titulo,
                'slug' => Str::slug($request->titulo),
                'descripcion' => $request->descripcion,
                'imagen_portada' => $rutaImagen,
                'video_url' => $request->video_url,
                'objetivo_financiacion' => $request->objetivo_financiacion,
                'fecha_limite' => $request->fecha_limite,
                'estado' => 'revision', // Siempre se crea en revisión
                'cantidad_recaudada' => 0,
            ]);

            // Guardar recompensas si vienen
            if ($request->has('recompensas')) {
                $recompensasData = json_decode($request->recompensas, true);
                if (is_array($recompensasData)) {
                    foreach ($recompensasData as $r) {
                        // Validar campos: titulo no vacío, costo numérico
                        if (!empty($r['titulo']) && isset($r['cantidad']) && is_numeric($r['cantidad'])) {
                            $proyecto->recompensas()->create([
                                'nombreRecompensa' => $r['titulo'],
                                'descripcionRecompensa' => $r['descripcion'] ?? '',
                                'costoRecompensa' => $r['cantidad'],
                                'tipoEntrega' => 'fisica', // Default
                            ]);
                        }
                    }
                }
            }

            DB::commit();

            // Cargar la relación para devolverla en la respuesta
            $proyecto->load('categoria');

            return response()->json([
                'message' => 'Proyecto creado con éxito',
                'proyecto' => $proyecto
            ], 201);

        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error creando proyecto: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error al crear el proyecto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(string $id)
    {
        $proyecto = Proyecto::with(['categoria', 'recompensas' => function ($query) {
            $query->orderBy('costoRecompensa', 'asc');
        }, 'user', 'faqs'])->findOrFail($id);

        // Seguridad: Proteger proyectos en revisión o cancelados
        if (in_array($proyecto->estado, ['revision', 'cancelado'])) {
            /** @var \App\Models\User|null $user */
            $user = Auth::guard('sanctum')->user();
            
            if (!$user || ($user->id !== $proyecto->user_id && !$user->hasRole('admin'))) {
                return response()->json(['message' => 'No tienes permiso para ver este proyecto.'], 403);
            }
        }

        // Inject into the response object
        // $proyecto->setAttribute('is_following', $isFollowing);

        return response()->json($proyecto);
    }

    /**
     * Muestra el formulario de edición.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Actualiza un proyecto.
     */
    public function update(Request $request, string $id)
    {
        $proyecto = Proyecto::findOrFail($id);
        
        // Verificar propiedad (si no es admin, lógica adicional necesaria aquí o en middleware)
        if ($proyecto->user_id !== Auth::id() && !Auth::user()->hasRole('admin')) {
            return response()->json(['message' => 'No tienes permiso para editar este proyecto.'], 403);
        }

        $request->validate([
            'titulo' => 'sometimes|required|max:255|unique:proyectos,titulo,' . $proyecto->id,
            'categoria_id' => 'sometimes|required|exists:categorias,id',
            'imagen_portada' => 'nullable|image|max:2048',
            'objetivo_financiacion' => 'sometimes|required|numeric|min:1',
            'fecha_limite' => 'sometimes|required|date',
            'descripcion' => 'sometimes|required',
        ], [
            'titulo.required' => 'El proyecto necesita un nombre.',
            'titulo.unique' => 'Este nombre de proyecto ya está pillado.',
            'categoria_id.required' => 'Elige una categoría.',
            'categoria_id.exists' => 'Esa categoría no es válida.',
            'imagen_portada.image' => 'El archivo debe ser una imagen.',
            'imagen_portada.max' => 'La imagen no puede pesar más de 2MB.',
            'objetivo_financiacion.required' => 'Define cuánto dinero necesitas.',
            'objetivo_financiacion.min' => 'El objetivo debe ser positivo.',
            'fecha_limite.required' => 'Pon una fecha límite.',
            'descripcion.required' => 'La descripción completa es vital.',
        ]);

        $datos = $request->only(['titulo', 'categoria_id', 'objetivo_financiacion', 'fecha_limite', 'descripcion', 'video_url']);
        if ($request->has('titulo')) {
            $datos['slug'] = Str::slug($request->titulo);
        }

        if ($request->hasFile('imagen_portada')) {
            // Borrar imagen antigua si existe
            if ($proyecto->imagen_portada) {
                Storage::disk('public')->delete($proyecto->imagen_portada);
            }
            $datos['imagen_portada'] = $request->file('imagen_portada')->store('proyectos', 'public');
        }

        $proyecto->update($datos);

        // Actualizar recompensas si vienen
        if ($request->has('recompensas')) {
            $recompensasData = json_decode($request->recompensas, true);
            if (is_array($recompensasData)) {
                $idsEnviados = [];
                foreach ($recompensasData as $r) {
                    if (!empty($r['titulo']) && isset($r['cantidad']) && is_numeric($r['cantidad'])) {
                        $recompensaId = $r['dbId'] ?? (is_numeric($r['id']) ? $r['id'] : null);
                        
                        if ($recompensaId) {
                            $recompensa = $proyecto->recompensas()->find($recompensaId);
                            if ($recompensa) {
                                $recompensa->update([
                                    'nombreRecompensa' => $r['titulo'],
                                    'descripcionRecompensa' => $r['descripcion'] ?? '',
                                    'costoRecompensa' => $r['cantidad'],
                                ]);
                                $idsEnviados[] = $recompensa->id;
                            }
                        } else {
                            $nuevaRecompensa = $proyecto->recompensas()->create([
                                'nombreRecompensa' => $r['titulo'],
                                'descripcionRecompensa' => $r['descripcion'] ?? '',
                                'costoRecompensa' => $r['cantidad'],
                                'tipoEntrega' => 'fisica',
                            ]);
                            $idsEnviados[] = $nuevaRecompensa->id;
                        }
                    }
                }
                
                // Eliminar las que no se enviaron
                $recompensasAEliminar = $proyecto->recompensas()->whereNotIn('id', $idsEnviados)->get();
                foreach ($recompensasAEliminar as $recompensaAEliminar) {
                    if (!$recompensaAEliminar->donaciones()->exists()) {
                        $recompensaAEliminar->delete();
                    }
                }
            }
        }

        return response()->json($proyecto);
    }

    /**
     * Elimina un proyecto
     */
    public function destroy(string $id)
    {
        $proyecto = Proyecto::findOrFail($id);
        if ($proyecto->user_id !== Auth::id() && !Auth::user()->hasRole('admin')) {
            return response()->json(['message' => 'No tienes permiso para eliminar este proyecto.'], 403);
        }
        if ($proyecto->imagen_portada) {
            Storage::disk('public')->delete($proyecto->imagen_portada);
        }
        $proyecto->delete();
        return response()->json(null, 204);
    }

    public function proyectosDestacados()
    {
        $proyectos = Proyecto::with('categoria')
            ->where('estado', 'publicado')
            ->where('ganadorEvento', true)
            ->limit(3)
            ->get();

        return response()->json($proyectos);
    }

    public function historiasExito()
    {
        $proyectos = Proyecto::with('categoria')
            ->where('estado', 'completado')
            ->whereRaw('cantidad_recaudada >= (objetivo_financiacion * 2)')
            ->orderBy('updated_at', 'desc')
            ->limit(3)
            ->get();

        return response()->json($proyectos);
    }

    public function seguir(string $id)
    {
        $proyecto = Proyecto::findOrFail($id);
        
        if (Auth::check()) {
            $user = Auth::user();
            // Evitar duplicados
            if (!$user->proyectos()->where('idProyecto', $id)->exists()) {
                $user->proyectos()->attach($id);
                $proyecto->increment('seguidores');
            }
        } else {
            $proyecto->increment('seguidores');
        }

        return response()->json(['message' => 'Proyecto seguido', 'seguidores' => $proyecto->seguidores]);
    }

    public function dejarDeSeguir(string $id)
    {
        $proyecto = Proyecto::findOrFail($id);
        
        if (Auth::check()) {
            $user = Auth::user();
            if ($user->proyectos()->where('idProyecto', $id)->exists()) {
                $user->proyectos()->detach($id);
                if ($proyecto->seguidores > 0) {
                    $proyecto->decrement('seguidores');
                }
            }
        } else {
            if ($proyecto->seguidores > 0) {
                $proyecto->decrement('seguidores');
            }
        }

        return response()->json(['message' => 'Proyecto dejado de seguir', 'seguidores' => $proyecto->seguidores]);
    }

    /**
     * Obtiene las donaciones de un proyecto (Solo para el creador)
     */
    public function donaciones(Request $request, string $id)
    {
        $proyecto = Proyecto::findOrFail($id);

        if ($proyecto->user_id !== Auth::id()) {
            return response()->json(['message' => 'No tienes permiso para ver las donaciones de este proyecto.'], 403);
        }

        // The relationship is named 'users' and 'recompensas' in Donacion.php
        $donaciones = $proyecto->donaciones()->with(['users', 'recompensas'])->orderBy('fechaCompra', 'desc')->get();

        return response()->json($donaciones);
    }

    /**
     * Actualiza el estado de un proyecto (Solo Admin)
     */
    public function updateEstado(Request $request, string $id)
    {
        $request->validate([
            'estado' => 'required|in:publicado,cancelado'
        ]);

        $proyecto = Proyecto::findOrFail($id);
        $proyecto->estado = $request->estado;
        $proyecto->save();

        return response()->json(['message' => 'Estado del proyecto actualizado', 'proyecto' => $proyecto]);
    }
}