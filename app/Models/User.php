<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    // こんな感じで書く(この場合、UserクラスはToDoDatailsレコードを複数持っている)
    // 主キー側
    // public function toDoDatails()
    // {
    //     return $this->hasMany(ToDoDatails::class);
    // }


    // 外部キー側(この場合、親要素(Userレコード)を一つ持つ)
    // public function User()
    // {
    //     return $this->belongsTo(User::class);
    // }

    public function sessions(){
        return $this->hasMany(Session::class);
    }

    public function projects(){
        return $this->hasMany(FormProject::class);
    }

    public function customTools(){
        return $this->hasMany(CustomTool::class);
    }

}
