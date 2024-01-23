<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class UE extends Model
{
    use HasFactory;

    protected $table = 'u_e_s';

    public function staff(): BelongsTo
    {
        return $this->belongsTo(Staff::class);
    }

    public function requests(): BelongsToMany
    {
        return $this->belongsToMany(Request::class, 'receiver_request', 'ue_id', 'request_id');
    }
}
