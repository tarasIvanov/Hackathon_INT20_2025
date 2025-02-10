<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
        try {
            $user = $request->user();

            $validated = $request->validate([
                'name' => ['sometimes', 'string', 'max:255'],
                'email' => ['sometimes', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
                'password' => ['sometimes', 'string', 'min:8'],
            ]);

            if (isset($validated['password'])) {
                $validated['password'] = Hash::make($validated['password']);
            }

            $updatedUser = $this->userRepository->update($user, $validated);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'User update failed: ' . $e->getMessage()
            ], 404);
        }

        return response()->json([
            'data' => $updatedUser,
            'message' => 'User updated successfully'
        ]);
    }

    public function destroy(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            $this->userRepository->delete($request->user());
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'User deletion failed:' . $e->getMessage()
            ], 500);
        }

        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }
}
