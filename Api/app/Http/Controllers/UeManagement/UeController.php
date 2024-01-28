<?php

namespace App\Http\Controllers\UeManagement;

use App\Factories\SaveDeadlineActionCommandFactory;
use App\Factories\UpdateDeadlineActionCommandFactory;
use App\Http\Controllers\Controller;
use App\Http\Requests\SaveDeadlineRequest;
use App\Http\Requests\UpdateDeadlineRequest;
use App\Services\UeService;
use Exception;
use Illuminate\Http\JsonResponse;

class UeController extends Controller
{

    public function addDeadline(
        SaveDeadlineRequest $request,
        UeService           $handler,
        string              $secretaryId
    ): JsonResponse
    {

        $httpJson = [
            'status' => 200,
            'message' => '',
            'isSaved' => false
        ];

        try {
            $command = SaveDeadlineActionCommandFactory::buildFromRequest($request);
            $response = $handler->handleSaveDeadline($command, $secretaryId);

            $httpJson = [
                'status' => 201,
                'isSaved' => $response->isSaved,
                'message' => $response->message
            ];
        } catch (Exception $e) {
            $httpJson['message'] = $e->getMessage();
        }
        return response()->json($httpJson);
    }

    public function updateDeadline(
        UpdateDeadlineRequest $request,
        UeService           $handler,
        string              $ueId
    ): JsonResponse
    {

        $httpJson = [
            'status' => 200,
            'message' => '',
        ];

        try {
            $command = UpdateDeadlineActionCommandFactory::buildFromRequest($request);
            $response = $handler->handleUpdateDeadline($command, $ueId);

            $httpJson = [
                'status' => 201,
                'message' => $response->message
            ];
        } catch (Exception $e) {
            $httpJson['message'] = $e->getMessage();
        }
        return response()->json($httpJson);
    }

    public function getUeFromDepartmentAndDeadline(
        string    $secretaryId,
        UeService $handler

    ): JsonResponse
    {
        $httpJson = [
            'status' => 200,
            'message' => ''
        ];
        try {
            $response = $handler->handleGetUeFromDepartmentAndDeadline($secretaryId);
            $httpJson = [
                'status' => 201,
                'ues' => $response->ues,
                'message' => $response->message
            ];
        } catch (Exception $e) {
            $httpJson['message'] = $e->getMessage();
        }
        return response()->json($httpJson);
    }

}
