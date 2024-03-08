<?php

namespace App\Helpers;

use App\Models\Request;
use App\Models\User;
use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

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

        $filename = time() . '_' . $file->getClientOriginalName();
        $file->storeAs($storagePath, $filename);

        return $storagePath . DIRECTORY_SEPARATOR . $filename;
    }

    private static function isFileSizeLowerThan5Mo(UploadedFile $file): bool
    {

        return $file->getSize() <= self::MAX_FILE_SIZE;
    }

    private static function isFileTypeValid(UploadedFile $file): bool
    {
        $allowedFileTypes = ['pdf', 'png', 'jpeg', 'jpg', 'PNG', 'JPEG', 'JPG'
        ];

        $extension = $file->getClientOriginalExtension();

        return in_array($extension, $allowedFileTypes, true);
    }

    public static function unique_str(): string
    {
        $uniqueStr = Str::random(8);
        while (Request::where('request_code', $uniqueStr)->exists()) {
            $uniqueStr = Str::random(8);
        }
        return $uniqueStr;
    }


    public static function getUserData($userId): array
    {
        $user = User::whereIsDeleted(false)->whereId($userId)->get();

        if (!$user) {
            // User not found
            return [];
        }
        // Create the user data array
        return [
            'name' => $user->name,
            'email' => $user->email,
        ];
    }

   public static function generateRandomPassword($length = 8): string
    {
        $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $password = '';
        $charLength = strlen($characters) - 1;

        for ($i = 0; $i < $length; $i++) {
            $randomChar = $characters[rand(0, $charLength)];
            $password .= $randomChar;
        }

        return $password;
    }
}
