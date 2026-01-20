<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

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
            'nombreCompleto' => $atributos['nombreCompleto'] ?? null,
            'email' => $atributos['email'],
            'password' => $atributos['password']
        ]);

        Auth::login($user);

        return response()->json([
            'message' => 'Usuario registrado exitosamente',
            'user' => $user,
            'redirect' => route('home')
        ], 201);
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
            // RESPUESTA JSON:
            return response()->json(['message' => 'Login exitoso', 'user' => Auth::user()], 200);
        }

        // ERROR JSON:
        return response()->json(['message' => 'Credenciales incorrectas'], 401);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Expire cookies matching session config exactly
        $domain = config('session.domain');
        $secure = config('session.secure');
        $httpOnly = config('session.http_only');
        $sameSite = config('session.same_site');
        $path = config('session.path');

        $cookieXsrf = Cookie::make('XSRF-TOKEN', '', -1, $path, $domain, $secure, false, false, $sameSite);
        $cookieSession = Cookie::make(config('session.cookie'), '', -1, $path, $domain, $secure, $httpOnly, false, $sameSite);
        
        // Queue them to ensure they are attached to headers
        Cookie::queue($cookieXsrf);
        Cookie::queue($cookieSession);

        return response()->json(['message' => 'Sesión cerrada']);
    }
}