<?php

use App\Http\Controllers\AnswerOptionController;
use App\Http\Controllers\Api\V1\Auth\AuthController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\QuestController;
use App\Http\Controllers\QuestProgressController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\TaskController;
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
    Route::get('/users', [UserController::class, 'showAll']);
    Route::get('/user', [UserController::class, 'show']);
    Route::patch('/user', [UserController::class, 'update']);
    Route::delete('/user', [UserController::class, 'destroy']);
    Route::patch('/user/avatar', [UserController::class, 'updateAvatar']);
    Route::get('/user/quests', [QuestController::class, 'getUserQuests']);

    // Quest Management Routes
    Route::prefix('quests')->group(function () {
        Route::get('/', [QuestController::class, 'index']);
        Route::post('/', [QuestController::class, 'store']);
        Route::get('/{id}', [QuestController::class, 'show']);
        Route::delete('/{id}', [QuestController::class, 'destroy'])->middleware('quest.owner');
    });
});

// Route::get('/quest', [QuestController::class, 'index']);
// Route::get('/quest/{quest}', [QuestController::class, 'show']);
// Route::post('/quest', [QuestController::class, 'store']);
// Route::put('/quest/{quest}', [QuestController::class, 'update']);
// Route::delete('/quest/{quest}', [QuestController::class, 'destroy']);


Route::get('/task', [TaskController::class, 'index']);
Route::post('/task', [TaskController::class, 'store']);
Route::get('/task/{task}', [TaskController::class, 'show']);
Route::put('/task/{task}', [TaskController::class, 'update']);
Route::delete('/task/{task}', [TaskController::class, 'destroy']);

Route::get('/answer_option', [AnswerOptionController::class, 'index']);
Route::get('/answer_option/{answerOption}', [AnswerOptionController::class, 'show']);
Route::post('/answer_option', [AnswerOptionController::class, 'store']);
Route::put('/answer_option/{answerOption}', [AnswerOptionController::class, 'update']);
Route::delete('/answer_option/{answerOption}', [AnswerOptionController::class, 'destroy']);

Route::get('/rating', [RatingController::class, 'index']);
Route::get('/rating/{rating}', [RatingController::class, 'show']);
Route::post('/rating', [RatingController::class, 'store']);
Route::put('/rating/{rating}', [RatingController::class, 'update']);
Route::delete('/rating/{rating}', [RatingController::class, 'destroy']);

Route::get('/quest_progress', [QuestProgressController::class, 'index']);
Route::get('/quest_progress/{questProgress}', [QuestProgressController::class, 'show']);
Route::post('/quest_progress', [QuestProgressController::class, 'store']);
Route::put('/quest_progress/{questProgress}', [QuestProgressController::class, 'update']);

Route::get('user/{user}/ratings', [RatingController::class, 'getUserRatings']);
Route::get('quest/{quest}/ratings', [RatingController::class, 'getQuestRatings']);
