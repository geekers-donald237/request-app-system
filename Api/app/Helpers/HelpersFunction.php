<?php

namespace App\Helpers;

use Exception;
use Illuminate\Http\UploadedFile;

class HelpersFunction
{
    /**
     * @throws Exception
     */
    public static function handleFileUpload(UploadedFile $file, string $storagePath): string
    {
        // Vérifier la taille du fichier
        if (!self::isFileSizeValid($file)) {
            throw new Exception('La taille du fichier est trop grande.');
        }

        // Vérifier le type de fichier
        if (!self::isFileTypeValid($file)) {
            throw new Exception('Le type de fichier n\'est pas autorisé.');
        }

        // Le reste de votre logique pour le téléchargement du fichier
        $filename = time() . $file->getClientOriginalName();
        $file->storeAs($storagePath, $filename);

        return $filename;
    }

    private static function isFileSizeValid(UploadedFile $file): bool
    {
        // Définir la taille maximale autorisée (par exemple, 5 Mo)
        $maxFileSize = 5 * 1024 * 1024; // 5 Mo en octets

        return $file->getSize() <= $maxFileSize;
    }

    private static function isFileTypeValid(UploadedFile $file): bool
    {
        // Liste des types de fichiers autorisés
        $allowedFileTypes = ['pdf', 'png', 'jpeg', 'jpg'];

        // Vérifier l'extension du fichier
        $extension = $file->getClientOriginalExtension();

        return in_array($extension, $allowedFileTypes, true);
    }


}
