<?php

namespace App\Helpers;

use Exception;
use Illuminate\Http\UploadedFile;

class HelpersFunction
{
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    /**
     * @throws Exception
     */
    public static function handleFileUpload(UploadedFile $file, string $storagePath): string
    {
        if (!self::isFileSizeLowerThan5Mo($file)) {
            throw new Exception('La taille du fichier est trop grande.');
        }

        if (!self::isFileTypeValid($file)) {
            throw new Exception('Le type de fichier n\'est pas autorisé.');
        }

        $filename = time() . $file->getClientOriginalName();
        $file->storeAs($storagePath, $filename);

        return $filename;
    }

    private static function isFileSizeLowerThan5Mo(UploadedFile $file): bool
    {

        return $file->getSize() <= self::MAX_FILE_SIZE;
    }

    private static function isFileTypeValid(UploadedFile $file): bool
    {
        $allowedFileTypes = ['pdf', 'png', 'jpeg', 'jpg'];

        $extension = $file->getClientOriginalExtension();

        return in_array($extension, $allowedFileTypes, true);
    }


}
