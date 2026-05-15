<?php

namespace App\Http\Controllers;

use App\Models\Factura;
use App\Models\Proyecto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class FacturaController extends Controller
{
    public function indexUser()
    {
        $facturas = Factura::with('proyecto')
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($facturas);
    }

    public function store(Request $request)
    {
        $request->validate([
            'proyecto_id' => 'required|exists:proyectos,id',
            'numeroFactura' => 'required|numeric',
            'cif' => 'required|string|max:9',
            'fechaFactura' => 'required|date',
            'costo' => 'required|numeric|min:0',
            'descripcion' => 'required|string|max:255',
            'direccionFiscal' => 'required|string|max:255',
            'pdf' => 'required|file|mimes:pdf|max:10240', // 10MB max
        ]);

        // Check ownership of the project
        $proyecto = Proyecto::findOrFail($request->proyecto_id);
        if ($proyecto->user_id !== Auth::id()) {
            return response()->json(['message' => 'No tienes permiso.'], 403);
        }

        $pdfPath = $request->file('pdf')->store('facturas', 'public');

        $factura = Factura::create([
            'proyecto_id' => $request->proyecto_id,
            'user_id' => Auth::id(),
            'numeroFactura' => $request->numeroFactura,
            'cif' => $request->cif,
            'fechaFactura' => $request->fechaFactura,
            'costo' => $request->costo,
            'descripcion' => $request->descripcion,
            'direccionFiscal' => $request->direccionFiscal,
            'pdf' => $pdfPath,
            'estado' => 'pendiente',
        ]);

        return response()->json($factura->load('proyecto'), 201);
    }

    public function indexAdmin()
    {
        $facturas = Factura::with(['proyecto', 'user'])->orderBy('created_at', 'desc')->get();
        return response()->json($facturas);
    }

    public function updateEstado(Request $request, $id)
    {
        $request->validate([
            'estado' => 'required|in:pendiente,verificada,rechazada',
        ]);

        $factura = Factura::findOrFail($id);
        $factura->estado = $request->estado;
        $factura->save();

        return response()->json(['message' => 'Estado actualizado', 'factura' => $factura->load(['proyecto', 'user'])]);
    }
}
