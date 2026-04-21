<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Evento;
use App\Models\Proyecto;
use App\Models\User;
use Carbon\Carbon;

echo "--- EVENT MANAGER DEBUG ---\n";
echo "Current Time: " . Carbon::now()->toDateTimeString() . "\n\n";

echo "Active Events:\n";
$active = Evento::where('fechaInicio', '<=', Carbon::now())
    ->where('fechaFinal', '>=', Carbon::now())
    ->get();
if($active->isEmpty()) echo "None\n";
foreach($active as $e) echo "- ID: {$e->id}, Nombre: {$e->nombre}\n";

echo "\nUpcoming Events:\n";
$upcoming = Evento::where('fechaInicio', '>', Carbon::now())->get();
foreach($upcoming as $e) echo "- ID: {$e->id}, Nombre: {$e->nombre}, Inicio: {$e->fechaInicio}\n";

echo "\nUsers:\n";
foreach(User::all() as $u) echo "- ID: {$u->id}, Name: {$u->name}, Email: {$u->email}\n";

echo "\nProjects:\n";
foreach(Proyecto::all() as $p) echo "- ID: {$p->id}, Titulo: {$p->titulo}, UserID: {$p->user_id}\n";
