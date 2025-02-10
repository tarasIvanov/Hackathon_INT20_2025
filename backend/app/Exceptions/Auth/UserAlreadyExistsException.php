<?php

namespace App\Exceptions\Auth;

use Exception;

class UserAlreadyExistsException extends Exception
{
    protected $code = 409;
}
