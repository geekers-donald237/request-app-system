<?php

namespace App\Http\Controllers\RequestManagement;

use App\Http\Controllers\Controller;
use App\Services\RequestPatternService;
use Illuminate\Http\JsonResponse;

class RequestPatternController extends Controller
{
    public function getAllRequestPatterns(
        RequestPatternService $handler
    ): JsonResponse
    {
        $httpJson = [
            'status' => 200,
            'patterns' => []
        ];
        $response = $handler->handle();

        $httpJson['patterns'] = $response->patterns;
        return response()->json($httpJson);
    }
}
