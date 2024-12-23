<?php

namespace App\Http\Requests\NewProjectUpdate;

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
            'title' => 'required|string',
            'thumbnail' => 'required|string',
            'projectId' => 'required|string',
            'isPublished' => 'required|string',
            'htmlCode' => 'required|string',
        ] + SessionAuthRule::$rule;
    }
}
