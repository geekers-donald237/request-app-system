<?php

use App\Http\Controllers\UeManagement\UeController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('ues/{secretaryId}/deadline', [UeController::class, 'addDeadline'])->name('ues/{secretaryId}/deadline');
    Route::get('ues/{secretaryId}/deadline', [UeController::class, 'getUeFromDepartmentAndDeadline'])->name('ues/{secretaryId}/deadline');
});

