<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\Purchase;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Purchase>
 */
class PurchaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $posts = Post::pluck('id')->all();
        //Purchase::truncate();

        return [
            'post_id'   =>  fake()->randomElement($posts),
            'amount'    =>  fake()->randomNumber(4)
        ];
    }
}
