<?php

namespace App\Http\Controllers\UeManagement;

use App\Http\Controllers\Controller;
use App\Services\UeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UeController extends Controller
{
    public function getUeFromLevel(
        UeService $handler
    ): JsonResponse
    {
        $httpJson = [
            'status' => 200
        ];

        $response = $handler->handleGetUe();

        $httpJson['ue'] = $response->ue;
        return response()->json($httpJson);
    }
}
