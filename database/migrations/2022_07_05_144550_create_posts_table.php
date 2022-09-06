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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id');
            $table->foreignId('user_id');
            $table->string('title', 191)->unique();
            $table->string('coverImg', 191)->nullable();
            $table->string('audioUrl', 191)->nullable();
            $table->string('videoUrl', 191)->nullable();
            $table->tinyInteger('views')->default(0);
            $table->tinyInteger('purchases')->default(0);
            $table->text('content');
            $table->string('slug', 191);
            $table->tinyInteger('status')->nullable();
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
        Schema::dropIfExists('posts');
    }
};
