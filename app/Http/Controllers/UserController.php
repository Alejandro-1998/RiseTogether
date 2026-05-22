<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }

    public function show(Request $request, string $id = null)
    {
        $user = $id ? User::where('id', $id)->orWhere('nombreUsuario', $id)->firstOrFail() : $request->user();

        if ($user) {
            $user->loadCount([
                'proyectosCreados' => function ($query) {
                    $query->whereIn('estado', ['publicado', 'completado', 'fallido']);
                },
                'seguidores',
                'seguidos'
            ]);
            $user->load(['donaciones.proyectos.categoria', 'donaciones.recompensas', 'proyectos', 'proyectoDestacado.categoria']);

            if (Auth::check()) {
                /** @var \App\Models\User $authUser */
                $authUser = Auth::user();
                $user->siguiendo = $authUser->seguidos()->where('users.id', $user->id)->exists();
            } else {
                $user->siguiendo = false;
            }
        }

        return response()->json($user);
    }

    public function search(Request $request)
    {
        $query = $request->query('query', '');
        
        $users = User::where('nombreUsuario', 'like', "%{$query}%")
                     ->orWhere('nombreCompleto', 'like', "%{$query}%")
                     ->get();

        if (Auth::check()) {
            /** @var \App\Models\User $authUser */
            $authUser = Auth::user();
            $seguidosIds = $authUser->seguidos()->pluck('users.id')->toArray();
            $users->transform(function ($u) use ($seguidosIds) {
                $u->siguiendo = in_array($u->id, $seguidosIds);
                return $u;
            });
        }

        return response()->json($users);
    }

    public function update(Request $request)
    {
        /** @var \App\Models\User $usuario */
        $usuario = Auth::user();
        return $this->processUpdate($request, $usuario);
    }

    public function updateAdmin(Request $request, string $id)
    {
        $usuario = User::findOrFail($id);
        return $this->processUpdate($request, $usuario);
    }

    private function processUpdate(Request $request, User $usuario)
    {
        $validaciones = $request->validate([
            'nombreUsuario' => ['sometimes', 'required', 'string', 'max:30', Rule::unique('users')->ignore($usuario->id)],
            'nombreCompleto' => ['nullable', 'string', 'max:30'],
            'email' => ['sometimes', 'string', 'email', 'max:255', Rule::unique('users')->ignore($usuario->id)],
            'dni' => ['nullable', 'string', 'max:9', Rule::unique('users')->ignore($usuario->id)],
            'fechaNacimiento' => ['nullable', 'date', 'before_or_equal:today'],
            'direccion' => ['nullable', 'string', 'max:255'],
            'biografia' => ['nullable', 'string'],
            'numeroCuenta' => ['nullable', 'string', 'size:24', 'regex:/^ES[0-9]{22}$/', Rule::unique('users')->ignore($usuario->id)],
            'photo' => ['nullable', 'image', 'max:2048'], // 2MB Max
            'banner_photo' => ['nullable', 'image', 'max:4096'], // 4MB Max for banner
            'proyecto_destacado_id' => ['nullable', 'exists:proyectos,id'],
        ], [
            'nombreUsuario.required' => 'El nombre de usuario es obligatorio.',
            'nombreUsuario.unique' => 'Este nombre de usuario ya está en uso.',
            'email.email' => 'El correo electrónico no es válido.',
            'email.unique' => 'Este correo electrónico ya está registrado.',
            'dni.max' => 'El DNI no puede tener más de 9 caracteres.',
            'dni.unique' => 'Este DNI ya está registrado.',
            'numeroCuenta.size' => 'El número de cuenta debe tener exactamente 24 caracteres.',
            'numeroCuenta.regex' => 'El formato del número de cuenta es inválido (debe empezar por ES seguido de 22 dígitos).',
            'numeroCuenta.unique' => 'Este número de cuenta ya está asociado a otro usuario.',
        ]);

        if ($request->hasFile('photo')) {
            if ($usuario->profile_photo_path) {
                Storage::disk('public')->delete($usuario->profile_photo_path);
            }

            $path = $request->file('photo')->store('profile-photos', 'public');
            $validaciones['profile_photo_path'] = $path;
        }

        if ($request->hasFile('banner_photo')) {
            if ($usuario->banner_photo_path) {
                Storage::disk('public')->delete($usuario->banner_photo_path);
            }

            $path = $request->file('banner_photo')->store('profile-banners', 'public');
            $validaciones['banner_photo_path'] = $path;
        }

        if ($request->has('role')) {
             $nombreRol = $request->role;
             
            try {
                $role = \Spatie\Permission\Models\Role::firstOrCreate(['name' => $nombreRol, 'guard_name' => 'web']);
                $usuario->syncRoles([$role]);
            } catch (\Exception $e) {}
        }

        if ($request->filled('current_password')) {
            $request->validate([
                'current_password' => ['required', 'current_password'],
                'password' => ['required', 'string', 'min:8', 'confirmed'],
            ], [
                'current_password.current_password' => 'La contraseña actual no es correcta.',
                'password.required' => 'La nueva contraseña es obligatoria.',
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

    public function actividadReciente(Request $request, string $id)
    {
        $limit = $request->query('limit', 10);
        $user = User::where('id', $id)->orWhere('nombreUsuario', $id)->firstOrFail();
        $actividades = collect();

        $proyectosCreados = \App\Models\Proyecto::where('user_id', $user->id)
            ->whereIn('estado', ['publicado', 'completado', 'fallido'])
            ->get();
        foreach ($proyectosCreados as $p) {
            $actividades->push([
                'texto' => 'Ha creado el proyecto «' . $p->titulo . '»',
                'fecha' => $p->created_at,
                'icon' => 'rocket_launch',
                'color' => 'orange'
            ]);
        }

        $donaciones = \App\Models\Donacion::with('proyectos')->where('idUsuario', $user->id)->get();
        foreach ($donaciones as $d) {
            if ($d->proyectos) {
                $actividades->push([
                    'texto' => 'Ha apoyado el proyecto «' . $d->proyectos->titulo . '»',
                    'fecha' => $d->fechaCompra ? \Carbon\Carbon::parse($d->fechaCompra) : $d->created_at,
                    'icon' => 'favorite',
                    'color' => 'red'
                ]);
            }
        }

        $seguidos = $user->seguidos()->withPivot('created_at')->get();
        foreach ($seguidos as $s) {
            $actividades->push([
                'texto' => 'Ha empezado a seguir a ' . ($s->nombreUsuario ?? $s->nombreCompleto),
                'fecha' => $s->pivot->created_at,
                'icon' => 'person_add',
                'color' => 'blue'
            ]);
        }

        $seguidores = $user->seguidores()->withPivot('created_at')->get();
        foreach ($seguidores as $s) {
            $actividades->push([
                'texto' => ($s->nombreUsuario ?? $s->nombreCompleto) . ' le ha empezado a seguir',
                'fecha' => $s->pivot->created_at,
                'icon' => 'group_add',
                'color' => 'blue'
            ]);
        }

        $proyectosSeguidos = $user->proyectos()->withPivot('created_at')->get();
        foreach ($proyectosSeguidos as $p) {
            $actividades->push([
                'texto' => 'Ha empezado a seguir el proyecto «' . $p->titulo . '»',
                'fecha' => $p->pivot->created_at ?? $p->created_at,
                'icon' => 'bookmark_add',
                'color' => 'green'
            ]);
        }

        $actividades = $actividades->sortByDesc('fecha')->take($limit)->values();

        $actividades->transform(function ($item) {
            $item['tiempo'] = \Carbon\Carbon::parse($item['fecha'])->locale('es')->diffForHumans();
            return $item;
        });

        return response()->json($actividades);
    }
}
