<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OriginUser extends Model
{
    use HasFactory;
    public function getWrapUser(){
        return WrapUser::find($this->wrap_user_id);
    }
}
