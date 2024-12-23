<?php

namespace App\Http\Requests\NewCustomToolUpdate;

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
            'intCustomToolId'=>'required|string',
            'stringCustomToolId'=>'required|string',
            'title'=>'required|string',
            'thumbnail'=>'required|string',
            'isPublished'=>'required|string',
            'htmlCode'=>'required|string',
        ] + SessionAuthRule::$rule;
    }
}
