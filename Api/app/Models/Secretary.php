<?php

namespace App\Models;

use App\Enums\RequestStateEnum;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Secretary extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function requests(): Builder
    {
        return Request::with('attachments', 'receivers')
            ->whereIsDeleted(false)->whereStatut(RequestStateEnum::ATTENTE_DE_VALIDATION->value);
    }

}
