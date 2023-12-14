<?php

namespace App\Http\Controllers\RequestManagement;

use App\Factories\SaveRequestActionCommandFactory;
use App\Http\Controllers\Controller;
use App\Http\Requests\SaveActionRequest;
use App\Services\RequestService;
use Exception;
use Illuminate\Http\JsonResponse;

class RequestController extends Controller
{
    public function save(
        SaveActionRequest $request,
        RequestService    $handler
    ): JsonResponse
    {
        $httpJson = [
            'status' => 200,
            'message' => '',
            'isSaved' => false
        ];

        try {
            $command = SaveRequestActionCommandFactory::buildFromRequest($request);
            $response = $handler->handle($command);

            $httpJson = [
                'status' => 201,
                'requestId' => $response->requestId,
                'isSaved' => $response->isSaved,
                'message' => $response->message
            ];
        } catch (Exception $e) {
            $httpJson['message'] = $e->getMessage();
        }
        return response()->json($httpJson);
    }
}
