<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('origin_users', function (Blueprint $table) {
            $table->id();
            $table->text('origin_user_id');
            $table->text('password');
            $table->foreignId('wrap_user_id')
                ->references('id')
                ->on('wrap_users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('origin_users');
    }
};
