<?php

namespace App\Http\Requests\NewProjectAdd;

use Illuminate\Foundation\Http\FormRequest;

class SessionAuthRule
{
    public static $rule = [
        'emailOrOriginUserId'=>'required|string',
        'sessionId'=>'required|string',
        'authType'=>'required|string',
    ];
}
