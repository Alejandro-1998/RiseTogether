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
        $query = Proyecto::with('categoria');

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

        $proyectos = $query->get();
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
                'estado' => $request->estado ?? 'borrador',
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

    /**
     * Obtiene un único proyecto.
     */
    public function show(string $id)
    {
        $proyecto = Proyecto::with(['categoria', 'recompensas' => function ($query) {
            $query->orderBy('costoRecompensa', 'asc');
        }, 'user'])->findOrFail($id);

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
        if ($proyecto->user_id !== Auth::id()) {
            return response()->json(['message' => 'No tienes permiso para editar este proyecto.'], 403);
        }

        $request->validate([
            'titulo' => 'required|max:255|unique:proyectos,titulo,' . $proyecto->id,
            'categoria_id' => 'required|exists:categorias,id',
            'imagen_portada' => 'nullable|image|max:2048', // Opcional al editar
            'objetivo_financiacion' => 'required|numeric|min:1',
            'fecha_limite' => 'required|date|after:today',
            'descripcion' => 'required',
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
            'fecha_limite.after' => 'La fecha límite debe ser futura.',
            'descripcion.required' => 'La descripción completa es vital.',
        ]);

        $datos = $request->all();
        $datos['slug'] = Str::slug($request->titulo);

        if ($request->hasFile('imagen_portada')) {
            // Borrar imagen antigua si existe
            if ($proyecto->imagen_portada) {
                Storage::disk('public')->delete($proyecto->imagen_portada);
            }
            $datos['imagen_portada'] = $request->file('imagen_portada')->store('proyectos', 'public');
        }

        $proyecto->update($datos);
        return response()->json($proyecto);
    }

    /**
     * Elimina un proyecto
     */
    public function destroy(string $id)
    {
        $proyecto = Proyecto::findOrFail($id);
        if ($proyecto->user_id !== Auth::id()) {
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
        // Logic moved to client-side localStorage
        return response()->json(['message' => 'Logic moved to localStorage']);
    }

    public function dejarDeSeguir(string $id)
    {
        // Logic moved to client-side localStorage
        return response()->json(['message' => 'Logic moved to localStorage']);
    }
}