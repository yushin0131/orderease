<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WrapUser extends Model
{
    use HasFactory;

    public function originUser(){
        return $this->hasOne(OriginUser::class);
    }

    public function googleUser(){
        return $this->hasOne(GoogleUser::class);
    }

    public function sessions(){
        return $this->hasMany(NewSession::class);
    }

    public function projects(){
        return $this->hasMany(NewProject::class);
    }

    public function customTools(){
        return $this->hasMany(NewCustomTool::class);
    }
}
