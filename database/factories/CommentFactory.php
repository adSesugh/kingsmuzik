<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $posts = Post::pluck('id')->all();
        //Comment::truncate();

        return [
            'post_id'   =>  fake()->randomElement($posts),
            'name'   => fake()->name(),
            'message'   =>  fake()->realTextBetween(100, 150)
        ];
    }
}
