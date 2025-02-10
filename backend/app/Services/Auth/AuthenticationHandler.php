<?php

namespace App\Services\Auth;

use App\Exceptions\Auth\InvalidCredentialsException;
use App\Exceptions\Auth\UserAlreadyExistsException;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;

class AuthenticationHandler
{
    public function __construct(
        private readonly UserRepository $userRepository
    ) {}

    /**
     * @throws UserAlreadyExistsException
     */
    public function register(array $data): array
    {
        if ($this->userRepository->findByEmail($data['email'])) {
            throw new UserAlreadyExistsException('User with this email already exists');
        }

        $user = $this->userRepository->create($data);
        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    /**
     * @throws InvalidCredentialsException
     */
    public function login(array $credentials): array
    {
        $user = $this->userRepository->findByEmail($credentials['email']);

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            throw new InvalidCredentialsException('Invalid credentials');
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    public function logout(string $token): void
    {
        auth()->user()->tokens()->where('id', $token)->delete();
    }
}
