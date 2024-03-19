<?php

namespace App\Http\Controllers\Auth;

use App\Factories\LoginCommandFactory;
use App\Factories\NewsletterCommandFactory;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginActionRequest;
use App\Http\Requests\NewsletterActionRequest;
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
            'isLogged' => false,
            'status' => 200,
            'token' => '',
            'message' => ''
        ];
        try {
            $command = LoginCommandFactory::buildFromRequest($request);
            $response = $handler->handleLogin($command);
            $httpJson =
                [
                    'isLogged' => $response->isLogged,
                    'token' => $response->token,
                    'user' => $response->user,
                    'message' => $response->message
                ];

        } catch (Exception $e) {
            $httpJson['message'] = $e->getMessage();
        }

        return response()->json($httpJson);
    }

    public function save(
        NewsletterActionRequest $request,
        AuthService             $handler
    ): JsonResponse
    {
        $httpJson = [
            'status' => 200,
            'message' => ''
        ];
        try {
            $command = NewsletterCommandFactory::buildFromRequest($request);
            $response = $handler->handleNewsletter($command);
            $httpJson =
                [
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
