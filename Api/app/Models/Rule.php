<?php

namespace App\Models;

use Database\Factories\RuleFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Rule extends Model
{
    use HasFactory;

    protected $guarded = [];

    public static function newFactory(): RuleFactory
    {
        return RuleFactory::new();
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
}
