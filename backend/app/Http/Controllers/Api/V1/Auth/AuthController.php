<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Exceptions\Auth\InvalidCredentialsException;
use App\Exceptions\Auth\UserAlreadyExistsException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Auth\LoginRequest;
use App\Http\Requests\Api\V1\Auth\RegisterRequest;
use App\Services\Auth\AuthenticationHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        private readonly AuthenticationHandler $authHandler
    ) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $result = $this->authHandler->register($request->validated());
            return response()->json($result, 201);
        } catch (UserAlreadyExistsException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (\Exception $e) {
            return response()->json(['error' => 'Registration failed:' . $e->getMessage()], 500);
        }
    }

    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $result = $this->authHandler->login($request->validated());
            return response()->json($result);
        } catch (InvalidCredentialsException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (\Exception $e) {
            return response()->json(['error' => 'Login failed: ' . $e->getMessage()], 500);
        }
    }

    public function logout(Request $request): JsonResponse
    {
        try {
            $this->authHandler->logout($request->user()->currentAccessToken()->id);
            return response()->json(['message' => 'Successfully logged out']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Logout failed:' . $e->getMessage()], 500);
        }
    }
}
