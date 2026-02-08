<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ComentarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $comentarios = Comentario::all();
        return response()->json($comentarios);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'idProyecto' => 'required|exists:proyectos,id',
            'idComentario' => 'nullable|exists:comentarios,id',
            'mensaje' => 'required|string|min:3|max:1000',
            'fechaHora' => 'required|date',
            'estrellas' => 'nullable|integer|min:1|max:5',
        ], [
            'idProyecto.required' => 'El proyecto es obligatorio.',
            'idProyecto.exists' => 'El proyecto seleccionado no existe.',
            'idComentario.exists' => 'El comentario al que respondes no existe.',
            'mensaje.required' => 'El mensaje no puede estar vacío.',
            'mensaje.min' => 'El mensaje debe tener al menos :min caracteres.',
            'mensaje.max' => 'El mensaje no puede superar los :max caracteres.',
            'fechaHora.required' => 'La fecha y hora son obligatorias.',
            'fechaHora.date' => 'La fecha no tiene un formato válido.',
            'estrellas.integer' => 'La valoración debe ser un número entero.',
            'estrellas.min' => 'La valoración mínima es 1 estrella.',
            'estrellas.max' => 'La valoración máxima son 5 estrellas.',
        ]);

        $comentario = Comentario::create([
            'idUsuario' => Auth::id(),
            'idProyecto' => $request->idProyecto,
            'idComentario' => $request->idComentario,
            'mensaje' => $request->mensaje,
            'fechaHora' => $request->fechaHora,
            'estrellas' => $request->estrellas,
            'estado' => 'pendiente',
        ]);

        return response()->json($comentario, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $comentario = Comentario::findOrFail($id);
        return response()->json($comentario);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $comentario = Comentario::where('idUsuario', Auth::id())->findOrFail($id);

        $request->validate([
            'mensaje' => 'required|string|min:3|max:1000',
            'estrellas' => 'nullable|integer|min:1|max:5',
        ], [
            'mensaje.required' => 'El mensaje no puede estar vacío.',
            'mensaje.min' => 'El mensaje debe tener al menos :min caracteres.',
            'mensaje.max' => 'El mensaje no puede superar los :max caracteres.',
            'estrellas.integer' => 'La valoración debe ser un número entero.',
            'estrellas.min' => 'La valoración mínima es 1 estrella.',
            'estrellas.max' => 'La valoración máxima son 5 estrellas.',
        ]);

        $comentario->update($request->only(['mensaje', 'estrellas']));

        return response()->json($comentario);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $comentario = Comentario::where('idUsuario', Auth::id())->findOrFail($id);
        $comentario->delete();

        return response()->json(null, 204);
    }

    /**
     * Comentarios con más estrellas de los últimos 7 días.
     */
    public function comentariosRelevantes()
    {
        $comentarios = Comentario::with('user')
            // ->where('estado', 'aprobado') // Commented out to show all comments for now
            ->withCount([
                'estrellasRecibidas as estrellas_recientes' => function ($query) {
                    $query->where('created_at', '>=', now()->subDays(7));
                }
            ])
            ->orderBy('estrellas_recientes', 'desc')
            ->limit(3)
            ->get();

        return response()->json($comentarios);
    }
    /**
     * Toggle like for a comment.
     */
    public function toggleLike($id)
    {
        $comentario = Comentario::findOrFail($id);
        $user = Auth::user();

        // Check if already liked
        $existingLike = \App\Models\ComentarioEstrella::where('user_id', $user->id)
            ->where('comentario_id', $comentario->id)
            ->first();

        if ($existingLike) {
            $existingLike->delete();
            $liked = false;
        } else {
            \App\Models\ComentarioEstrella::create([
                'user_id' => $user->id,
                'comentario_id' => $comentario->id,
            ]);
            $liked = true;
        }

        return response()->json([
            'liked' => $liked,
            'likes_count' => $comentario->estrellasRecibidas()->count()
        ]);
    }

    /**
     * Obtener comentarios de un proyecto específico.
     */
    public function getProjectComments($projectId)
    {
        $userId = Auth::id();

        // Fetch all comments for the project with user data and like counts
        $allComments = Comentario::with('user')
            ->where('idProyecto', $projectId)
            ->withCount(['estrellasRecibidas as likes_count'])
            ->orderBy('created_at', 'desc')
            ->get();

        // Check if current user liked each comment
        // Efficient way: get all likes for these comments by this user
        $userLikes = [];
        if ($userId) {
            $commentIds = $allComments->pluck('id');
            $userLikes = \App\Models\ComentarioEstrella::where('user_id', $userId)
                ->whereIn('comentario_id', $commentIds)
                ->pluck('comentario_id')
                ->flip()
                ->toArray();
        }

        // Build a tree structure
        $commentsById = [];
        $rootComments = [];

        // First pass: Index by ID and initialize relations and attributes
        foreach ($allComments as $comment) {
            $comment->setRelation('comentarios_respuesta', collect([])); // Initialize as empty collection
            $comment->is_liked = isset($userLikes[$comment->id]);
            $commentsById[$comment->id] = $comment;
        }

        // Second pass: Link children to parents
        foreach ($allComments as $comment) {
            if ($comment->idComentario) {
                // It's a reply
                if (isset($commentsById[$comment->idComentario])) {
                    $parent = $commentsById[$comment->idComentario];
                    $parent->comentarios_respuesta->push($comment);
                }
            } else {
                // It's a root comment
                $rootComments[] = $comment;
            }
        }

        return response()->json(array_values($rootComments));
    }
}