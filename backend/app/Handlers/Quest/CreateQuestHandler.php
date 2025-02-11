<?php

declare(strict_types=1);

namespace App\Handlers\Quest;

use App\Models\Quest;
use App\Repositories\QuestRepository;
use App\Repositories\TaskRepository;
use App\Repositories\AnswerOptionRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Exception;

class CreateQuestHandler
{
    public function __construct(
        private readonly QuestRepository $questRepository,
        private readonly TaskRepository $taskRepository,
        private readonly AnswerOptionRepository $answerOptionRepository
    ) {}

    public function handle(array $data): Quest
    {
        try {
            DB::beginTransaction();

            // Create quest with user_id
            $quest = $this->questRepository->create([
                'user_id' => Auth::id(),
                'name' => $data['name'],
                'description' => $data['description'] ?? null,
                'time_limit' => $data['time_limit'] ?? null,
            ]);

            // Create tasks for the quest
            if (isset($data['tasks']) && is_array($data['tasks'])) {
                foreach ($data['tasks'] as $taskData) {
                    // Create task
                    $task = $this->taskRepository->create([
                        'quest_id' => $quest->id,
                        'name' => $taskData['name'],
                        'description' => $taskData['description'] ?? null,
                        'points' => $taskData['points'] ?? 0,
                    ]);

                    // Create answer options for the task
                    if (isset($taskData['answer_options']) && is_array($taskData['answer_options'])) {
                        $this->answerOptionRepository->createMany($taskData['answer_options'], $task->id);
                    }
                }
            }

            DB::commit();

            // Reload the quest with all relationships
            return $this->questRepository->findById($quest->id);
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
