<?php

namespace App\Services;

use App\Models\UE;
use App\Responses\GetUeActionResponse;

class UeService
{
    public function handleGetUe(): GetUeActionResponse
    {
        $response = new GetUeActionResponse();
        $response->ue = UE::whereIsDeleted(false)->get();
        return $response;
    }
}
