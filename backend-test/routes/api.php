<?php

use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuestController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/quest', [QuestController::class, 'index']);

Route::get('/quest/{quest}', [QuestController::class, 'show']);

Route::post('/quest', [QuestController::class, 'store']);

Route::put('/quest/{quest}', [QuestController::class, 'update']);

Route::delete('/quest/{quest}', [QuestController::class, 'delete']);


Route::get('/task', [TaskController::class, 'index']);
Route::post('/task', [TaskController::class, 'store']);
Route::get('/task/{task}', [TaskController::class, 'show']);
Route::put('/task/{task}', [TaskController::class, 'update']);



