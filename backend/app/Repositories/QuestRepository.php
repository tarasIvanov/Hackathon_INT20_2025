<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Quest;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class QuestRepository
{
    public function __construct(
        private readonly Quest $model
    ) {}

    public function create(array $data): Quest
    {
        return $this->model->create($data);
    }

    public function findById(int $id): ?Quest
    {
        return $this->model->with(['tasks.answerOptions'])->find($id);
    }

    public function getAll(): Collection
    {
        return $this->model->with(['tasks.answerOptions'])->latest()->get();
    }

    public function getUserQuests(): Collection
    {
        return $this->model
            ->where('user_id', Auth::id())
            ->with(['tasks.answerOptions'])
            ->latest()
            ->get();
    }

    public function update(Quest $quest, array $data): bool
    {
        return $quest->update($data);
    }

    public function delete(Quest $quest): bool
    {
        return $quest->delete();
    }
}
