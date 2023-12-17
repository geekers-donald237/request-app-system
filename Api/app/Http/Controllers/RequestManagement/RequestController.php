<?php

namespace App\Http\Controllers\RequestManagement;

use App\Factories\SaveRequestActionCommandFactory;
use App\Factories\SendRequestActionCommandFactory;
use App\Http\Controllers\Controller;
use App\Http\Requests\SaveActionRequest;
use App\Http\Requests\SendRequestActionRequest;
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

    public function getStudentRequests(
        string         $studentId,
        RequestService $handler
    ): JsonResponse
    {
        $httpJson = [
            'status' => 200,
            'message' => '',
            'requests' => []
        ];

        try {
            $response = $handler->handleGetStudentRequests($studentId);

            $httpJson = [
                'status' => 200,
                'requests' => $response->requests,
                'message' => $response->message
            ];
        } catch (Exception $e) {
            $httpJson['message'] = $e->getMessage();
        }
        return response()->json($httpJson);
    }

    public function deleteRequest(
        string         $requestId,
        RequestService $handler
    ): JsonResponse
    {
        $httpJson = [
            'status' => 200,
            'isDeleted' => false,
            'message' => ''
        ];

        try {
            $response = $handler->handleDeleteRequest($requestId);

            $httpJson = [
                'status' => 200,
                'isDeleted' => $response->isDeleted,
                'message' => $response->message
            ];
        } catch (Exception $e) {
            $httpJson['message'] = $e->getMessage();
        }
        return response()->json($httpJson);
    }

    public function sendRequest(
        SendRequestActionRequest $request,
        RequestService           $handler
    ): JsonResponse
    {
        $httpJson = [
            'status' => 200,
            'isSaved' => false,
            'message' => ''
        ];

        try {
            $command = SendRequestActionCommandFactory::buildFromRequest($request);
            $response = $handler->handleSendRequest($command);

            $httpJson = [
                'status' => 200,
                'isSaved' => $response->isSaved,
                'message' => $response->message
            ];
        } catch (Exception $e) {
            $httpJson['message'] = $e->getMessage();
        }
        return response()->json($httpJson);
    }
}
