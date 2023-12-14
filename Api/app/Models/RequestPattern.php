<?php

namespace App\Models;

use Database\Factories\RequestPatternFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestPattern extends Model
{
    use HasFactory;

    protected $guarded = [];

    public static function newFactory(): RequestPatternFactory
    {
        return RequestPatternFactory::new();
    }
}
