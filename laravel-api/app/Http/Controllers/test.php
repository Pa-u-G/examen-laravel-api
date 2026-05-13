<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Producto;
use App\Models\User;
use App\Models\Proyecto;


class test extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productos = Producto::all();
        return response()->json($productos, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $producto = Producto::findOrFail($request["id"]);
        
        $producto->precio = $request["precio"];
        
        $producto->save();
        
        $producto = Producto::findOrFail($request["id"]);
        
        return response()->json($producto, Response::HTTP_OK);
    }

    public function getUserId(Request $request)
    {
        $user = User::where('email', $request["email"])->first();

        return response()->json($user, Response::HTTP_OK);   
    }
    
    public function create_p(Request $request) {
        
        
        $validated = $request->validate([
            "nombre" => "required",
            "desc" => "required",
            "f_ini" => "required",
            "f_end" => "required",
            "user" => "required"
        ]);
        
        Proyecto::create($validated);

        return response()->json($request, Response::HTTP_OK);   
    }
    
    public function proyectos(Request $request)
    {
        $p = Proyecto::where("user", $request["id"])->get();
        return response()->json($p, Response::HTTP_OK); 
    }
}
