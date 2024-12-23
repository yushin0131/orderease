<?php

namespace App\Http\Requests\FormProjectUpdate;

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
          'email' => 'required|string',
          'sessionId' => 'required|string',
          'projectId' => 'required|string',
          'thumbnail' => 'required|string',
          'title' => 'required|string',
          'isPublished' => 'required|string',
          'htmlCode' => 'required|string',
        ];
    }
}
