<?php

namespace App\Http\Requests\CustomToolAdd;

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
            'title' => 'required|string',
            'thumbnail' => 'string',
            'sessionId' => 'required|string',
            'email' => 'required|string',
            'customToolId' => 'required|string',
        ];
    }
}
