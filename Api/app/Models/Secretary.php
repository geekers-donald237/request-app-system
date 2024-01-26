<?php

namespace App\Models;

use App\Enums\RequestStateEnum;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
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
        return Request::with('attachments')
            ->whereIsDeleted(false)->whereStatut(RequestStateEnum::ATTENTE_DE_VALIDATION->value);
    }

    public function getRequestsForUes(array $ueIds): Builder
    {
        return $this->requests()
            ->whereHas('ues', function ($query) use ($ueIds) {
                $query->whereIn('u_e_s.id', $ueIds);
            })
            ;
    }



    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

}
