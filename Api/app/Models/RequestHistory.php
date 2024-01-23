<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RequestHistory extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $table = 'request_history';

    public function request(): BelongsTo
    {
        return $this->belongsTo(Request::class);
    }

    public function modifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'modify_by');
    }
}
