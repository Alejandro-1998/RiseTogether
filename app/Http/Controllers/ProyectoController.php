<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Proyecto;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
            'resumen' => 'required|max:255',
            'categoria_id' => 'required|exists:categorias,id',
            'imagen_portada' => 'required|image|max:2048',
            'objetivo_financiacion' => 'required|numeric|min:1',
            'fecha_limite' => 'required|date|after:today',
            'descripcion' => 'required',
        ], [
            'titulo.required' => 'El proyecto necesita un nombre.',
            'categoria_id.required' => 'Elige una categoría.',
            'imagen_portada.required' => 'La imagen es obligatoria para atraer mecenas.',
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
                'resumen' => $request->resumen,
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
        }, 'user'])->where('id', $id)->first();
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
        //
    }

    /**
     * Elimina un proyecto
     */
    public function destroy(string $id)
    {
        Proyecto::where('id', $id)->first()->delete();
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
}