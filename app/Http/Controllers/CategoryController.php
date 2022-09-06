<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function __construct()
    {
        return $this->middleware('auth');
    }

    public function index()
    {
        return Inertia::render('Category/List', [
            'categories'    => CategoryResource::collection(Category::latest()->get())
        ]);
    }


    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'  =>  ['required', 'unique:categories']
        ]);

        try {
            Category::create([
                'name'  =>  $request->name,
                'user_id'   =>  auth()->id()
            ]);

            return redirect()->route('categories.index');
        } catch (\Throwable $th) {
            return redirect()->withErrors(['errors' => $th]);
        }
    }

    public function show($slug)
    {
        return Inertia::render('Category/Show', [
            'category'  => Category::with(['posts'])->whereSlug($slug)->first()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit($slug)
    {
        return Inertia::render('Category/List', [
            'category'  => Category::whereSlug($slug)->first(),
            'categories'    => CategoryResource::collection(Category::latest()->get())
        ]);
    }

    public function update(Request $request, $slug)
    {
        $request->validate([
            'name'  =>  ['required']
        ]);

        try {
            $category = Category::whereSlug($slug)->first();
            $category->update([
                'name'  =>  $request->name,
                'user_id'   =>  auth()->id()
            ]);

            return redirect()->route('categories.index');
        } catch (\Throwable $th) {
            return redirect()->withErrors(['errors' => $th]);
        }
    }

    public function destroy($slug)
    {
        $category = Category::whereSlug($slug)->first();
        $category->delete();
        return redirect()->route('categories.index');
    }
}
