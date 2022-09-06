<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function __construct()
    {
        return $this->middleware(['guest']);
    }

    public function index() 
    {
        if(request()->category){
            $category = Category::whereName(request()->category)->pluck('id')->first();
            $posts = Post::with(['media', 'category'])->orderBy('created_at', 'desc')->where('category_id', $category)->paginate(50);
        }
        else {
            $posts = Post::with(['media', 'category'])->orderBy('created_at', 'desc')->paginate(20);
        }

        $trendings = Post::with(['media', 'comments'])->orderBy('views', 'desc')->inRandomOrder()->limit(5)->get();

        return Inertia::render('Public/Home', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'posts' => $posts,
            'trendings'  =>  $trendings
        ]);
    }

    public function singlePost($slug)
    {
        $post = Post::with(['media', 'comments'])->whereSlug($slug)->first();
        $post->update([
            'views' =>  $post->views + 1
        ]);
        $recents = Post::with(['media', 'comments'])->latest()->limit(8)->get();
        return Inertia::render('Public/SinglePost', [
            'post'  =>  $post,
            'recents'   =>  $recents
        ]);
    }
}
