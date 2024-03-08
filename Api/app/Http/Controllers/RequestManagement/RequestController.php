<?php

namespace App\Http\Controllers\RequestManagement;

use App\Factories\SaveDeadlineActionCommandFactory;
use App\Factories\SaveRequestActionCommandFactory;
use App\Factories\SendRequestActionCommandFactory;
use App\Factories\UpdateRequestActionCommandFactory;
use App\Http\Controllers\Controller;
use App\Http\Requests\SaveActionRequest;
use App\Http\Requests\SaveDeadlineRequest;
use App\Http\Requests\SendRequestActionRequest;
use App\Http\Requests\UpdateActionRequest;
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

  



    public function updateRequest(
        RequestService      $handler,
        UpdateActionRequest $request

    ): JsonResponse
    {
        $httpJson = [
            'status' => 200,
            'message' => ''
        ];
        try {
            $command = UpdateRequestActionCommandFactory::buildFromRequest($request);
            $response = $handler->handleUpdateRequest($command);

            $httpJson = [
                'status' => 201,
                'request' => $response->request,
                'message' => $response->message
            ];
        } catch (Exception $e) {
            $httpJson['message'] = $e->getMessage();
        }
        return response()->json($httpJson);
    }

    public function getRequest(
        string         $requestId,
        RequestService $handler

    ): JsonResponse
    {
        $httpJson = [
            'status' => 200,
            'message' => ''
        ];
        try {
            $response = $handler->handleGetRequest($requestId);

            $httpJson = [
                'status' => 201,
                'request' => $response->request,
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

    public function getStaffRequests(
        string         $staffId,
        RequestService $handler
    ): JsonResponse
    {
        $httpJson = [
            'status' => 200,
            'message' => '',
            'requests' => []
        ];

        try {
            $response = $handler->handleGetStaffRequests($staffId);

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


    public function getStudentInformation(
        string         $senderId,
        RequestService $handler
    ): JsonResponse
    {
        $httpJson = [
            'status' => 200,
            'message' => '',
            'data' => []
        ];

        try {
            $response = $handler->getStudentInfoByRequestId($senderId);
            $httpJson = [
                'status' => 200,
                'data' => $response->data,
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
            'isSent' => false,
            'message' => ''
        ];

        try {
            $command = SendRequestActionCommandFactory::buildFromRequest($request);
            $response = $handler->handleSendRequest($command);

            $httpJson = [
                'status' => 200,
                'isSent' => $response->isSent,
                'message' => $response->message
            ];
        } catch (Exception $e) {
            $httpJson['message'] = $e->getMessage();
        }
        return response()->json($httpJson);
    }

    public function getSecretaryRequests(
        string         $secretaryId,
        RequestService $handler
    ): JsonResponse
    {
        $httpJson = [
            'status' => 200,
            'message' => '',
            'requests' => []
        ];

        try {
            $response = $handler->handleGetSecretaryRequests($secretaryId);

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

    public function updateRequestStatus(
        string         $requestId,
        string         $newRequestStatut,
        RequestService $handler
    ): JsonResponse
    {
        $httpJson = [
            'status' => 200,
            'message' => ''
        ];

        try {
            $response = $handler->handleUpdateRequestStatus($requestId, $newRequestStatut);

            $httpJson = [
                'status' => 200,
                'message' => $response->message
            ];
        } catch (Exception $e) {
            $httpJson['message'] = $e->getMessage();
        }
        return response()->json($httpJson);
    }

    public function getRequestHistory(
        string         $requestId,
        RequestService $handler
    ): JsonResponse
    {
        $httpJson = [
            'status' => 200,
            'message' => ''
        ];

        try {
            $response = $handler->handleGetRequestHistory($requestId);

            $httpJson = [
                'status' => 200,
                'message' => $response->message,
                'history' => $response->history
            ];
        } catch (Exception $e) {
            $httpJson['message'] = $e->getMessage();
        }
        return response()->json($httpJson);
    }

    public function getAllStaff(
        RequestService $handler
    ): JsonResponse
    {
        $httpJson = [
            'status' => 200
        ];

        $response = $handler->handleGetStaff();

        $httpJson['staff'] = $response->staff;
        return response()->json($httpJson);
    }

    public function getAllUser(
        RequestService $handler
    ): JsonResponse
    {
        $httpJson = [
            'status' => 200
        ];

        $response = $handler->handleGetAllUser();

        $httpJson['user'] = $response->user;
        return response()->json($httpJson);
    }

    public function getStudentDetails(
        string         $studentId,
        RequestService $handler
    ): JsonResponse
    {
        $httpJson = [
            'status' => 200,
            'message' => '',
            'data' => [],
        ];

        try {
            $response = $handler->getStudentDetails($studentId);

            $httpJson = [
                'status' => $response->status,
                'data' => $response->data,
                'message' => $response->message,
            ];
        } catch (Exception $e) {
            $httpJson['message'] = $e->getMessage();
        }

        return response()->json($httpJson);
    }


}
