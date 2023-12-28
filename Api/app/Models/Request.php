<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Request extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function sender(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'sender_id', 'id');
    }

    public function attachments(): HasMany
    {
        return $this->hasMany(Attachment::class);
    }

    public function receivers(): BelongsToMany
    {
        return $this->belongsToMany(Staff::class, 'receiver_request', 'request_id', 'receiver_id');
    }

}
