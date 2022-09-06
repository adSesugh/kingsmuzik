<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    public function __construct()
    {
        return $this->middleware('auth');
    }

    public function index()
    {
        $posts = Post::with(['purchases', 'purchases.user'])->orderBy('purchases', 'desc')->whereHas('purchases')->get();
        return Inertia::render('Purchase/List', [
            'posts' =>  $posts
        ]);
    }
}
