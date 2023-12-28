<?php

namespace App\Listeners;

use App\Commands\SaveRequestActionCommand;
use App\Enums\StorageDirectoryEnum;
use App\Events\SaveFileEvent;
use App\Helpers\HelpersFunction;
use App\Models\Attachment;
use App\Models\Request;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;

class SaveFileListener implements ShouldQueue
{

    /**
     * The time (seconds) before the job should be processed.
     *
     * @var int
     */
    public int $delay = 60;
    public function __construct()
    {
    }

    /**
     * @throws Exception
     */
    public function handle(SaveFileEvent $event): void
    {
        $this->saveFileHandWritten($event->command, $event->request);
        $this->saveFileAttachments($event->command->fileAttachments, $event->request);
    }

    /**
     * @throws Exception
     */
    private function saveFileHandWritten(SaveRequestActionCommand $command, Request $request): void
    {
        $attachment = new Attachment();
        $filePath = HelpersFunction::handleFileUpload($command->fileHandWritten, StorageDirectoryEnum::FileHandWritten->value);
        $handWrittenData = $this->buildAttachmentData($filePath, $request, true);
        $attachment->fill($handWrittenData)->save();

    }

    private function buildAttachmentData(string $filePath, Request $request, bool $isHandWritten): array
    {
        return [
            'file_path' => $filePath,
            'request_id' => $request->getAttributeValue('id'),
            'is_handwritten' => $isHandWritten
        ];

    }

    /**
     * @throws Exception
     */
    private function saveFileAttachments(?array $attachments, Request $request): void
    {
        if (is_null($attachments)) {
            return;
        }
        foreach ($attachments as $attachment) {

            $attachmentModel = new Attachment();
            $filePath = HelpersFunction::handleFileUpload(
                $attachment,
                StorageDirectoryEnum::FileAttachment->value
            );
            $attachmentData = $this->buildAttachmentData($filePath, $request, false);
            $attachmentModel->fill($attachmentData)->save();

        }
    }
}
