<?php

namespace App\Events;

use App\Commands\SaveRequestActionCommand;
use App\Models\Request;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SaveFileEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public readonly SaveRequestActionCommand $command,
        public readonly Request                  $request
    )
    {
    }
}
