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
        Schema::create('new_custom_tools', function (Blueprint $table) {
            $table->id();
            $table->text('title');
            $table->mediumText('thumbnail');
            $table->text('html_code');
            $table->foreignId('wrap_user_id')
            ->references('id')
            ->on('wrap_users');
            $table->text('custom_tool_id');
            $table->boolean('is_published');
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
        Schema::dropIfExists('new_custom_tools');
    }
};
