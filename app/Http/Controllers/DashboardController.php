<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Models\User;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct()
    {   
        return $this->middleware('auth');
    }

    public function index()
    {
        $trendings = Post::orderBy('views', 'desc')->where('views', '>', 0)->limit(12)->get(['id', 'title', 'coverImg', 'audioUrl', 'videoUrl', 'slug']);
        $comments = CommentResource::collection(Comment::latest()->limit(10)->get());
        
        $members = User::isAdmin()->count();
        $income = Purchase::sum('amount');
        $purchases = Purchase::count();
        $views = Post::sum('views');
        $posts = Post::count();

        return Inertia::render('Dashboard', [
            'trendings' => $trendings,
            'stats'    => [
                'income'  =>  $income,
                'purchases' => $purchases,
                'comments'  =>  $comments,
                'members'   =>  $members,
                'posts' =>  $posts,
                'views' =>  $views
            ]
        ]);
    }
}
