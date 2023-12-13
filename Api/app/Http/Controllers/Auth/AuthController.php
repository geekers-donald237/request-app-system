<?php

namespace App\Http\Controllers\Auth;

use App\Factories\AuthCommandFactory;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function login(
        LoginRequest $request,
        AuthService  $handler
    ): JsonResponse
    {
        $httpJson = [
            'status' => 200,
            'token' => '',
            'message' => ''
        ];
        try {
            $command = AuthCommandFactory::buildFromRequest($request);
            $response = $handler->handle($command);
            $httpJson =
                [
                    'token' => $response->token,
                    'message' => $response->message
                ];

        } catch (\Exception $e) {
            $httpJson['message'] = $e->getMessage();
        }

        return response()->json($httpJson);
    }


}
