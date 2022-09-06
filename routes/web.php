<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\SettingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [PublicController::class, 'index'])->name('home');
Route::get('/category/{category}', [PublicController::class, 'index'])->name('category');
Route::get('detail/{slug}', [PublicController::class, 'singlePost'])->name('detail');

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('categories', [CategoryController::class, 'index'])->name('categories.index');
Route::post('categories', [CategoryController::class, 'store'])->name('categories.store');
Route::get('categories/{slug}', [CategoryController::class, 'show'])->name('categories.show');
Route::get('categories/{slug}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
Route::patch('categories/{slug}', [CategoryController::class, 'update'])->name('categories.update');
Route::delete('categories/{slug', [CategoryController::class, 'destroy'])->name('categories.destroy');

Route::get('posts', [PostController::class, 'index'])->name('posts.index');
Route::post('posts', [PostController::class, 'store'])->name('posts.store');
Route::get('posts/create', [PostController::class, 'create'])->name('posts.create');
Route::get('posts/{slug}', [PostController::class, 'show'])->name('posts.show');
Route::get('posts/{slug}/edit', [PostController::class, 'edit'])->name('posts.edit');
Route::patch('posts/{slug}', [PostController::class, 'update'])->name('posts.update');
Route::delete('posts/{slug', [PostController::class, 'destroy'])->name('posts.destroy');

Route::get('purchases', [PurchaseController::class, 'index'])->name('purchases.index');

Route::get('settings', [SettingController::class, 'index'])->name('settings.index');

require __DIR__.'/auth.php';
