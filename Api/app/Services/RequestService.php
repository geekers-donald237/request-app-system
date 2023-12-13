<?php

namespace App\Services;

use App\Commands\SaveRequestActionCommand;
use App\Models\Request;
use App\Responses\saveRequestToDBActionResponse;
use Illuminate\Support\Facades\Auth;

class RequestService
{
    public function handle(SaveRequestActionCommand $command): saveRequestToDBActionResponse
    {
        $response = new saveRequestToDBActionResponse();
        $request = new Request();   // request tranlate of requet or not default request laravel variables;
        $request->sender_id = Auth::user()->id;
        $request->request_pattern_id = $command->request_pattern_id;
        $request->title = $command->title;
        $request->content = $command->content;
        $request->save();

        $response->status = 201;
        $response->message = 'request succesfully store';

        return $response;
    }
}
