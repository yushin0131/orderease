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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('seat_number'); // 席番号
            $table->string('project_id'); // プロジェクト番号
            $table->string('product_name'); // 商品名
            $table->integer('quantity'); // 個数
            $table->integer('price'); // 価格
            $table->boolean('is_served')->default(false); // 提供済みかどうか
            $table->boolean('is_check')->default(false);
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
        Schema::dropIfExists('orders');
    }
};
