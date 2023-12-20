<?php

namespace App\Http\Requests;

use App\Shared\Infrastructure\HttpDataRequest;

class GetUserRequestsActionRequest extends HttpDataRequest
{
    public function messages(): array
    {
        return [
            'userId.required' => 'L\'utilisateur est obligatoire'
        ];
    }

    public function rules(): array
    {
        return [
            'userId' => 'required'
        ];
    }
}
