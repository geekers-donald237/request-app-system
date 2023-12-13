<?php

namespace App\Http\Controllers\Auth;

use App\Factories\LoginCommandFactory;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginActionRequest;
use App\Services\AuthService;
use Exception;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function login(
        LoginActionRequest $request,
        AuthService        $handler
    ): JsonResponse
    {
        $httpJson = [
            'status' => 200,
            'token' => '',
            'message' => ''
        ];
        try {
            $command = LoginCommandFactory::buildFromRequest($request);
            $response = $handler->handleLogin($command);
            $httpJson =
                [
                    'token' => $response->token,
                    'message' => $response->message
                ];

        } catch (Exception $e) {
            $httpJson['message'] = $e->getMessage();
        }

        return response()->json($httpJson);
    }

    public function logout(
        AuthService $handler
    ): JsonResponse
    {
        $httpJson = [
            'status' => 200,
            'message' => ''
        ];

        try {
            $response = $handler->handleLogout();
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
