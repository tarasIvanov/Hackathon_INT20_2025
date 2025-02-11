<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Handlers\Quest\CreateQuestHandler;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Quest\CreateQuestRequest;
use App\Repositories\QuestRepository;
use Illuminate\Http\JsonResponse;
use Exception;

class QuestController extends Controller
{
    public function __construct(
        private readonly CreateQuestHandler $createQuestHandler,
        private readonly QuestRepository $questRepository
    ) {}

    public function store(CreateQuestRequest $request): JsonResponse
    {
        try {
            $quest = $this->createQuestHandler->handle($request->validated());

            return response()->json([
                'status' => 'success',
                'message' => 'Quest created successfully',
                'data' => $this->formatQuestData($quest)
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create quest',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index(): JsonResponse
    {
        try {
            $quests = $this->questRepository->getAll();

            $formattedQuests = $quests->map(function ($quest) {
                return $this->formatQuestData($quest);
            })->values();

            return response()->json([
                'status' => 'success',
                'data' => $formattedQuests
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch quests',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getUserQuests(): JsonResponse
    {
        try {
            $quests = $this->questRepository->getUserQuests();

            $formattedQuests = $quests->map(function ($quest) {
                return $this->formatQuestData($quest);
            })->values();

            return response()->json([
                'status' => 'success',
                'data' => $formattedQuests
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch user quests',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(int $id): JsonResponse
    {
        try {
            $quest = $this->questRepository->findById($id);

            if (!$quest) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Quest not found'
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'data' => $this->formatQuestData($quest)
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch quest',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $quest = $this->questRepository->findById($id);
            $this->questRepository->delete($quest);

            return response()->json([
                'status' => 'success',
                'message' => 'Quest deleted successfully'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete quest',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function formatQuestData($quest): array
    {
        return [
            'id' => $quest->id,
            'user_id' => $quest->user_id,
            'name' => $quest->name,
            'description' => $quest->description,
            'time_limit' => $quest->time_limit,
            'created_at' => $quest->created_at,
            'updated_at' => $quest->updated_at,
            'tasks' => $quest->tasks->map(function ($task) {
                return [
                    'id' => $task->id,
                    'name' => $task->name,
                    'description' => $task->description,
                    'points' => $task->points,
                    'answer_options' => $task->answerOptions->map(function ($option) {
                        return [
                            'id' => $option->id,
                            'name' => $option->name,
                            'is_correct' => $option->is_correct
                        ];
                    })->values()->all()
                ];
            })->values()->all()
        ];
    }
}
