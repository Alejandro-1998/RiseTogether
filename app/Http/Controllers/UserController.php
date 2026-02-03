<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;

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
            'nombreUsuario' => ['required', 'string', 'max:30', Rule::unique('users')->ignore($usuario->id)],
            'nombreCompleto' => ['nullable', 'string', 'max:30'],
            'email' => ['sometimes', 'string', 'email', 'max:255', Rule::unique('users')->ignore($usuario->id)],
            'dni' => ['nullable', 'string', 'max:9', Rule::unique('users')->ignore($usuario->id)],
            'fechaNacimiento' => ['nullable', 'date', 'before_or_equal:today'],
            'direccion' => ['nullable', 'string', 'max:255'],
            'biografia' => ['nullable', 'string'],
            'numeroCuenta' => ['nullable', 'string', 'size:24', 'regex:/^ES[0-9]{22}$/', Rule::unique('users')->ignore($usuario->id)],
            'photo' => ['nullable', 'image', 'max:2048'], // 2MB Max
        ]);

        if ($request->hasFile('photo')) {
            if ($usuario->profile_photo_path) {
                Storage::disk('public')->delete($usuario->profile_photo_path);
            }

            $path = $request->file('photo')->store('profile-photos', 'public');
            $validaciones['profile_photo_path'] = $path;
        }

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

        // Logic for password update
        if ($request->filled('current_password')) {
            $request->validate([
                'current_password' => ['required', 'current_password'],
                'password' => ['required', 'string', 'min:8', 'confirmed'],
            ], [
                'current_password.current_password' => 'La contraseña actual no es correcta.',
                'password.min' => 'La nueva contraseña debe tener al menos 8 caracteres.',
                'password.confirmed' => 'La confirmación de la contraseña no coincide.',
            ]);

            $validaciones['password'] = \Illuminate\Support\Facades\Hash::make($request->password);
        }

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
