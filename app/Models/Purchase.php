<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'user_id',
        'amount'
    ];

    public static function boot()
    {
        parent::boot();

        self::creating(function ($model) {
            $model->user_id = 1;
        });
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
