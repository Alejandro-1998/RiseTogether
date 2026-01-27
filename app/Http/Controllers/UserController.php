<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Muestra una lista de todos los usuarios (para admin).
     */
    public function index()
    {
        return response()->json(User::all());
    }

    /**
     * Retorna el usuario autenticado actual O un usuario específico por ID.
     */
    public function show(Request $request, string $id = null)
    {
        $user = $id ? User::where('id', $id)->orWhere('nombreUsuario', $id)->firstOrFail() : $request->user();

        if ($user) {
            $user->loadCount('proyectosCreados');
            $user->load(['donaciones.proyectos.categoria', 'donaciones.recompensas', 'proyectos']);
            
            $totalFollowers = 0;
            foreach ($user->proyectosCreados as $proyecto) {
                // Sum 'seguidores' column
                $totalFollowers += $proyecto->seguidores;
            }
            $user->followers_count = $totalFollowers;
        }

        return response()->json($user);
    }

    public function update(Request $request)
    {
        /** @var \App\Models\User $usuario */
        $usuario = Auth::user();
        return $this->processUpdate($request, $usuario);
    }

    /**
     * Admin method to update another user
     */
    public function updateAdmin(Request $request, string $id)
    {
        $usuario = User::findOrFail($id);
        return $this->processUpdate($request, $usuario);
    }

    private function processUpdate(Request $request, User $usuario)
    {
        $validaciones = $request->validate([
            'nombreUsuario' => ['required', 'string', 'max:255', Rule::unique('users')->ignore($usuario->id)],
            'nombreCompleto' => ['nullable', 'string', 'max:255'],
            'email' => ['sometimes', 'string', 'email', 'max:255', Rule::unique('users')->ignore($usuario->id)],
            'dni' => ['nullable', 'string', 'max:9', Rule::unique('users')->ignore($usuario->id)],
            'fechaNacimiento' => ['nullable', 'date'],
            'direccion' => ['nullable', 'string', 'max:255'],
            'biografia' => ['nullable', 'string'],
            'numeroCuenta' => ['nullable', 'string', 'max:255', Rule::unique('users')->ignore($usuario->id)],
            // 'role' => ... if you want to update roles
        ]);

    if ($request->has('role')) {
             $nombreRol = $request->role; // 'admin' or 'usuario' or others
             
             // Ensure role exists to prevent 500 error
             // Use \Spatie\Permission\Models\Role or import it
             try {
                 $role = \Spatie\Permission\Models\Role::firstOrCreate(['name' => $nombreRol, 'guard_name' => 'web']);
                 $usuario->syncRoles([$role]);
             } catch (\Exception $e) {
                 // Fallback or log. Usually firstOrCreate handles it.
                 // If table roles doesn't exist, this might fail, but migrations should be run.
             }
        }

        // Logic split from original update method if different validation needed
        // but for now reusing basic update logic minus password/current_password for simplicity
        
        // Remove password fields if not handling them here or make them optional
        // For admin update, usually we don't ask for current_password of the USER.
        
        $usuario->update($validaciones);

        return response()->json([
            'message' => 'Usuario actualizado correctamente',
            'user' => $usuario
        ]);
    }

    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Usuario eliminado correctamente']);
    }
}
