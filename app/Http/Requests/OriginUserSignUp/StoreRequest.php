<?php

namespace App\Http\Requests\OriginUserSignUp;

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
            'originUserId'=>'required|string',
            'password'=>'required|string',
        ];
    }
}
