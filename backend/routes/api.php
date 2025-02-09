<?php

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
    Route::post('/register', [\App\Http\Controllers\Api\V1\Auth\AuthController::class, 'register']);
    Route::post('/login', [\App\Http\Controllers\Api\V1\Auth\AuthController::class, 'login']);

});

// Захищені маршрути
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    // Профіль користувача
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [\App\Http\Controllers\Api\V1\Auth\AuthController::class, 'logout']);

    // Захищені ендпоінти
//    Route::apiResource('/orders', \App\Http\Controllers\Api\V1\OrderController::class);
});
