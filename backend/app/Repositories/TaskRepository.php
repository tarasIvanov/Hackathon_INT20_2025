<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Collection;

class TaskRepository
{
    public function __construct(
        private readonly Task $model
    ) {}

    public function create(array $data): Task
    {
        return $this->model->create($data);
    }

    public function createMany(array $tasks, int $questId): Collection
    {
        $createdTasks = new Collection();
        foreach ($tasks as $taskData) {
            $taskData['quest_id'] = $questId;
            $createdTasks->push($this->create($taskData));
        }
        return $createdTasks;
    }

    public function findById(int $id): ?Task
    {
        return $this->model->find($id);
    }

    public function getByQuestId(int $questId): Collection
    {
        return $this->model->where('quest_id', $questId)
            ->with(['answerOptions'])
            ->get();
    }

    public function update(Task $task, array $data): bool
    {
        return $task->update($data);
    }

    public function delete(Task $task): bool
    {
        return $task->delete();
    }
}
