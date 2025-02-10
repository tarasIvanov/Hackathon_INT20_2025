<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(
        private readonly UserRepository $userRepository
    ) {}

    public function index(): JsonResponse
    {
        return response()->json([
            'data' => $this->userRepository->getAll()
        ]);
    }

    public function show(Request $request): JsonResponse
    {
        return response()->json([
            'data' => $request->user()
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'password' => ['sometimes', 'string', 'min:8', 'confirmed'],
        ]);

        $updatedUser = $this->userRepository->update($user, $validated);

        return response()->json([
            'data' => $updatedUser,
            'message' => 'User updated successfully'
        ]);
    }

    public function destroy(Request $request): JsonResponse
    {
        $user = $request->user();
        $this->userRepository->delete($user);

        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }
}
