<?php

use App\Models\Category;
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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('name', 70)->unique();
            $table->string('slug', 191);
            $table->timestamps();
        });

        $this->seedData();
    }


    public function seedData()
    {
        $data = [
            'Music',
            'Video',
            'News',
            'Mixtape',
            'Editorial',
            'spotlight'
        ];

        foreach ($data as $key => $value) {
            Category::create([
                'name'  =>  $value
            ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
    }
};
