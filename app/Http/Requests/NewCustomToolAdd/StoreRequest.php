<?php

namespace App\Http\Requests\NewCustomToolAdd;

use App\Http\Requests\NewProjectAdd\SessionAuthRule;
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
            'title'=>'required|string',
            'thumbnail'=>'required|string',
        ] + SessionAuthRule::$rule;
    }
}
