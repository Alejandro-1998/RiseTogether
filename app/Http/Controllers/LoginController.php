<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function index()
    {
        if (Auth::check()) {
            return redirect()->route('home');
        }
        return view('publico.login_registro');
    }

    public function registro(Request $request)
    {
        $atributos = $request->validate([
            'nombreUsuario' => ['required', 'string', 'max:255', 'unique:users'],
            'nombreCompleto' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
            'terminos' => ['accepted']
        ], [
            'nombreUsuario.unique' => 'Ese nombre de usuario ya está en uso.',
            'email.unique' => 'Este correo ya está registrado.',
            'password.confirmed' => 'Las contraseñas no coinciden.'
        ]);

        $user = User::create([
            'nombreUsuario' => $atributos['nombreUsuario'],
            'nombreCompleto' => $atributos['nombreCompleto'],
            'email' => $atributos['email'],
            'password' => $atributos['password']
        ]);

        Auth::login($user);

        return redirect()->route('home');
    }

    public function login(Request $request)
    {
        $credenciales = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $remember = $request->has('remember');

        if (Auth::attempt($credenciales, $remember)) {
            $request->session()->regenerate();

            return redirect()->intended(route('home'));
        }

        throw ValidationException::withMessages([
            'email' => 'El nombre y/o la contraseña no coinciden.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');
    }
}