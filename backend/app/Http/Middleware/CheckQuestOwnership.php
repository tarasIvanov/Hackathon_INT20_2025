<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Repositories\QuestRepository;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckQuestOwnership
{
    public function __construct(
        private readonly QuestRepository $questRepository
    ) {}

    public function handle(Request $request, Closure $next): Response
    {
        $questId = (int) $request->route('id');

        if ($questId <= 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid quest ID'
            ], 400);
        }

        $quest = $this->questRepository->findById($questId);

        if (!$quest) {
            return response()->json([
                'status' => 'error',
                'message' => 'Quest not found'
            ], 404);
        }

        if ($quest->user_id !== Auth::id()) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not authorized to perform this action'
            ], 403);
        }

        return $next($request);
    }
}
