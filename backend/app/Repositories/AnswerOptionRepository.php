<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\AnswerOption;
use Illuminate\Database\Eloquent\Collection;

class AnswerOptionRepository
{
    public function __construct(
        private readonly AnswerOption $model
    ) {}

    public function create(array $data): AnswerOption
    {
        return $this->model->create($data);
    }

    public function createMany(array $options, int $taskId): Collection
    {
        $createdOptions = new Collection();
        foreach ($options as $optionData) {
            $optionData['task_id'] = $taskId;
            $createdOptions->push($this->create($optionData));
        }
        return $createdOptions;
    }

    public function findById(int $id): ?AnswerOption
    {
        return $this->model->find($id);
    }

    public function getByTaskId(int $taskId): Collection
    {
        return $this->model->where('task_id', $taskId)->get();
    }

    public function update(AnswerOption $option, array $data): bool
    {
        return $option->update($data);
    }

    public function delete(AnswerOption $option): bool
    {
        return $option->delete();
    }
}
