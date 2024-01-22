<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Staff extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function receiveRequests(): BelongsToMany
    {
        return $this->belongsToMany(Request::class, 'receiver_request', 'receiver_id', 'request_id');
    }

    public function ue(): BelongsTo
    {
        return $this->belongsTo(UE::class);
    }
}
