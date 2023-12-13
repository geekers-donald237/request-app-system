<?php

namespace App\Services;

use App\Models\RequestPattern;
use App\Responses\GetAllRequestPatternsActionResponse;

class RequestPatternService
{

    public function handle() : GetAllRequestPatternsActionResponse
    {
        $response = new GetAllRequestPatternsActionResponse();
        $response->patterns = RequestPattern::whereIsDeleted(false)->get();

        return $response;
    }
}
