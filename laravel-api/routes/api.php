<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\test;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group.
|
*/

Route::get('/test', [test::class, 'index']);

Route::post('/save', [test::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);
// Route protected with Sanctum - returns the authenticated user
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
	return $request->user();
});

// Logout (revoke current token)
Route::middleware('auth:sanctum')->post('/logout', [App\Http\Controllers\AuthController::class, 'logout']);