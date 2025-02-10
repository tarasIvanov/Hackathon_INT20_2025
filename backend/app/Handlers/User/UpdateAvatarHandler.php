<?php

declare(strict_types=1);

namespace App\Handlers\User;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class UpdateAvatarHandler
{
    public function __construct(
        private readonly UserRepository $userRepository
    ) {}

    public function handle(User $user, string $avatar): void
    {
        $this->userRepository->update($user, ['avatar' => $avatar]);
    }
}
