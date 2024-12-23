<?php

namespace App\Http\Requests\NewSessionAuth;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'sessionId' => 'required|string',
            'emailOrOriginUserId' => 'required|string',
            'authType' => 'required|string',
        ];
    }
}
