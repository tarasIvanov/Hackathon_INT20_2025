<?php

use App\Http\Controllers\Api\V1\Auth\AuthController;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Публічні маршрути
Route::prefix('v1')->group(function () {
    // Аутентифікація
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Захищені маршрути
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    Route::post('/user/logout', [AuthController::class, 'logout']);

    // User routes
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/user', [UserController::class, 'show']);
    Route::patch('/user', [UserController::class, 'update']);
    Route::delete('/user', [UserController::class, 'destroy']);
});
