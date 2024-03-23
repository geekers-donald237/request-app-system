<?php

namespace App\Http\Request;

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
