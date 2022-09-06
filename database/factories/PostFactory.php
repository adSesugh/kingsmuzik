<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Log;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $categories = Category::pluck('id')->all();
        //dd($categories);
        $directory = storage_path('app/public/images');
        Post::truncate();

        return [
            'category_id'   => fake()->randomElement($categories),
            'user_id'   =>  1,
            'title' =>  fake()->sentence(),
            'coverImg'  =>  fake()->imageUrl(),
            'content'   =>  fake()->realText(),
            'status'    =>  1,
            'views'     =>  fake()->randomDigit()
        ];
    }
}
