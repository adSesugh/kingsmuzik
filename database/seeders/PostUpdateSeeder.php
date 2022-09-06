<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Purchase;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostUpdateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $purchases = Purchase::all();

        foreach ($purchases as $key => $purchase) {
            $post = Post::find($purchase->post_id);
            $post->update([
                'purchases' =>  $post->purchases + 1
            ]);
        }
    }
}
