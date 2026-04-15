<?php

use App\Models\Proyecto;
use App\Models\ProyectoActualizacion;
use App\Models\Comentario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ActualizacionController extends Controller
{
    public function index($projectId)
    {
        $actualizaciones = ProyectoActualizacion::where('idProyecto', $projectId)
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json($actualizaciones);
    }

    public function store(Request $request, $projectId)
    {
        $proyecto = Proyecto::findOrFail($projectId);

        if ($proyecto->user_id !== Auth::id()) {
            return response()->json(['message' => 'No tienes permiso para añadir actualizaciones a este proyecto.'], 403);
        }

        $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
        ]);

        $actualizacion = ProyectoActualizacion::create([
            'idProyecto' => $projectId,
            'titulo' => $request->titulo,
            'contenido' => $request->contenido,
        ]);

        return response()->json($actualizacion, 201);
    }

    public function show($id)
    {
        $actualizacion = ProyectoActualizacion::findOrFail($id);
        
        // Get comments for this specific update
        $allComments = Comentario::with('user')
            ->where('idActualizacion', $id)
            ->withCount(['estrellasRecibidas as likes_count'])
            ->orderBy('created_at', 'desc')
            ->get();

        // Check if current user liked each comment
        $userId = Auth::id();
        $userLikes = [];
        if ($userId) {
            $commentIds = $allComments->pluck('id');
            $userLikes = \App\Models\ComentarioEstrella::where('user_id', $userId)
                ->whereIn('comentario_id', $commentIds)
                ->pluck('comentario_id')
                ->flip()
                ->toArray();
        }

        // Build tree structure (similar to ComentarioController)
        $commentsById = [];
        $rootComments = [];

        foreach ($allComments as $comment) {
            $comment->setRelation('comentarios_respuesta', collect([]));
            $comment->is_liked = isset($userLikes[$comment->id]);
            $commentsById[$comment->id] = $comment;
        }

        foreach ($allComments as $comment) {
            if ($comment->idComentario) {
                if (isset($commentsById[$comment->idComentario])) {
                    $parent = $commentsById[$comment->idComentario];
                    $parent->comentarios_respuesta->push($comment);
                }
            } else {
                $rootComments[] = $comment;
            }
        }

        return response()->json([
            'actualizacion' => $actualizacion,
            'comentarios' => array_values($rootComments)
        ]);
    }
}
