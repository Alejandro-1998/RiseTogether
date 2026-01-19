<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Retorna el usuario autenticado actual O un usuario específico por ID.
     */
    public function show(Request $request, string $id = null)
    {
        if ($id) {
            $user = User::where('id', $id)->orWhere('nombreUsuario', $id)->firstOrFail();
            return response()->json($user);
        }
        return response()->json($request->user());
    }

    public function update(Request $request)
    {
        /** @var \App\Models\User $usuario */
        $usuario = Auth::user();

        $validaciones = $request->validate([
            'nombreUsuario' => ['required', 'string', 'max:255', Rule::unique('users')->ignore($usuario->id)],
            'nombreCompleto' => ['nullable', 'string', 'max:255'],
            'fechaNacimiento' => ['nullable', 'date'],
            'direccion' => ['nullable', 'string', 'max:255'],
            'biografia' => ['nullable', 'string'],
            'numeroCuenta' => ['nullable', 'string', 'max:255', Rule::unique('users')->ignore($usuario->id)],
            'current_password' => ['nullable', 'required_with:password', 'current_password'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ], [
            'nombreUsuario.required' => 'El nombre de usuario es obligatorio.',
            'nombreUsuario.unique' => 'Este nombre de usuario ya está en uso.',
            'nombreUsuario.max' => 'El nombre de usuario no puede tener más de 255 caracteres.',
            'numeroCuenta.unique' => 'Este número de cuenta ya está registrado.',
            'current_password.current_password' => 'La contraseña actual es incorrecta.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'password.confirmed' => 'La confirmación de la contraseña no coincide.',
        ]);

        if ($request->filled('password')) {
            $validaciones['password'] = bcrypt($request->password);
        } else {
            unset($validaciones['password']);
        }
        
        unset($validaciones['current_password']);
        unset($validaciones['password_confirmation']);

        $usuario->update($validaciones);

        return response()->json([
            'message' => 'Perfil actualizado correctamente',
            'user' => $usuario
        ]);
    }
}
