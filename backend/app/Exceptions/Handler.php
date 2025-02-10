<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        $this->renderable(function (AuthenticationException $e) {
            return response()->json([
                'error' => 'Unauthorized access',
                'message' => 'You must be logged in to access this resource'
            ], 401);
        });
    }
}
