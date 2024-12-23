<?php

namespace App\Http\Requests\FormProjectAdd;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'title' => 'required|string',
            'thumbnail' => 'string',
            'email' => 'required|string',
            'sessionId' => 'required|string',
        ];
    }
}
