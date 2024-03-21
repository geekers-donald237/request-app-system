<?php

namespace App\Http\Controllers\Auth;

use App\Factories\UpdateProfileActionCommandFactory;
use App\Factories\UpdateUserPasswordCommandFactory;
use App\Http\Controllers\Controller;
use App\Request\UpdatePasswordActionRequest;
use App\Request\UpdateProfilActionRequest;
use App\Services\AuthService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


class ProfileController extends Controller
{

    public function getProfileFromUser(
        AuthService $handler,
    ): JsonResponse
    {
        $httpJson =
            [
                'status' => 200,
                'message' => ''
            ];
        try {
            $response = $handler->handleGetUserProfile();
            $httpJson =
                [
                    'user' => $response->user,
                    'message' => $response->message
                ];

        } catch (Exception $e) {
            $httpJson['message'] = $e->getMessage();
        }
        return response()->json($httpJson);
    }

    /**
     * Update the user's profile information.
     */
    public function updateUserProfile(
        UpdateProfilActionRequest $request,
        AuthService               $handler,
    ): JsonResponse
    {
        $httpJson = [
            'message' => ''
        ];
        try {
            $command = UpdateProfileActionCommandFactory::buildFromRequest($request);
            $response = $handler->handleUpdateProfile($command);
            $httpJson =
                [
                    'message' => $response->message
                ];
        } catch (Exception $e) {
            $httpJson['message'] = $e->getMessage();
        }

        return response()->json($httpJson);
    }

    public function updateUserPassword(
        UpdatePasswordActionRequest $request,
        AuthService                 $handler,
    ): JsonResponse
    {
        $httpJson = [
            'message' => ''
        ];
        try {
            $command = UpdateUserPasswordCommandFactory::buildFromRequest($request);
            $response = $handler->handleUpdatePassword($command);
            $httpJson =
                [
                    'message' => $response->message
                ];
        } catch (Exception $e) {
            $httpJson['message'] = $e->getMessage();
        }

        return response()->json($httpJson);
    }

    /**
     * Delete the user's account.
     */
    public function deletedUserAccount(AuthService $handler, Request $request
    ): JsonResponse
    {
        $httpJson = [
            'status' => 200,
            'message' => ''
        ];

        try {
            $response = $handler->handleDeleteAccount($request);
            $httpJson =
                [
                    'message' => $response->message
                ];

        } catch (Exception $e) {
            $httpJson['message'] = $e->getMessage();
        }

        return response()->json($httpJson);
    }

}
