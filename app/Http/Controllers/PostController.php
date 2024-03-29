<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Image;

class PostController extends Controller
{
    public function __construct()
    {
        return $this->middleware('auth');
    }

    public function index()
    {
        return Inertia::render('Post/List', [
            'posts' =>  Post::get(['id', 'coverImg', 'title', 'created_at', 'views', 'purchases', 'audioUrl', 'videoUrl', 'slug'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Post/Create', [
            'categories'    => Category::latest()->get(['id as value', 'name as label']),
            'posts' =>  Post::with(['category'])->latest()->limit(10)->get()
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'unique:posts'],
            'coverImg'  =>  ['required', 'image', 'mimes:jpg,jpeg,png,gif'],
        ]);

        $videoPath = null;
        $audioPath = null;

        $cover = $request->file('coverImg');
        $coverImgPhoto = time().'.'.$cover->getClientOriginalExtension();

        $destinationPath = public_path('/images');
        $imgFile = Image::make($cover->getRealPath());
        $imgFile->save($destinationPath.'/'.$coverImgPhoto);

        Log::info($request->all());

        if($request->has('audioUrl') && $request->file('audioUrl')){
            $audio = $request->file('audioUrl');
            $audioName = $audio->getClientOriginalName();
            $audioPath = $request->file('audioUrl')->storeAs('media', $audioName, 'kingsmuzik_media');
            Log::info($audioPath);
        }

        if($request->has('videoUrl') && $request->file('videoUrl')){
            $video = $request->file('videoUrl');
            $videoName = $video->getClientOriginalName();
            $videoPath = $request->file('videoUrl')->storeAs('media', $videoName, 'kingsmuzik_media');
        }

        DB::transaction(function() use ($request, $coverImgPhoto, $audioPath, $videoPath){

            $post = Post::create([
                'title' =>  $request->title,
                'category_id'   => $request->category_id,
                'coverImg'  =>  env('APP_URL'). '/images/'.$coverImgPhoto,
                'audioUrl'  => is_null($audioPath) ? NULL : env('APP_URL').$audioPath,
                'videoUrl'  =>  is_null($videoPath) ? NULL : env('APP_URL').$videoPath,
                'status'    => $request->status,
                'content'   => $request->content
            ]);

            if(!is_null($audioPath)){
                $post->addMedia(public_path('media/'.$audioPath))->toMediaCollection();
                $postMedia = $post->media;
                Log::info($postMedia);
            }

            if(!is_null($videoPath)){
                $post->addMedia(public_path('media/'.$videoPath))->toMediaCollection();
                $postMedia = $post->media;
                Log::info($postMedia);
            }
        });

        return redirect()->route('posts.index');
    }

    public function show($slug)
    {
        return Inertia::render('Post/Show', [
            'post'  =>  Post::whereSlug($slug)->with(['comments', 'comments.user', 'category', 'media'])->first()
        ]);
    }

    public function edit(Post $post)
    {
        return Inertia::render('', []);
    }

    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        //
    }
}
