<?php

namespace App\Http\Controllers\RequestManagement;

use App\Factories\GetUserRequestsActionCommandFactory;
use App\Factories\SaveRequestActionCommandFactory;
use App\Http\Controllers\Controller;
use App\Http\Requests\GetUserRequestsActionRequest;
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
            $response = $handler->handleSaveRequest($command);

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

    public function getUserRequests(
        string         $userId,
        RequestService $handler
    ): JsonResponse
    {
        $httpJson = [
            'status' => 200,
            'message' => '',
            'requests' => []
        ];

        try {
            $response = $handler->handleGetUserRequests($userId);

            $httpJson = [
                'status' => 201,
                'requests' => $response->requests,
                'message' => $response->message
            ];
        } catch (Exception $e) {
            $httpJson['message'] = $e->getMessage();
        }
        return response()->json($httpJson);
    }
}
