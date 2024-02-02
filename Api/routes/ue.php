<?php

use App\Http\Controllers\UeManagement\UeController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('ues/{secretaryId}/deadline', [UeController::class, 'addDeadline'])->name('ues/{secretaryId}/deadline');
    Route::get('ues/{secretaryId}/deadline', [UeController::class, 'getUeFromDepartmentAndDeadline'])->name('ues/{secretaryId}/deadline');
    Route::post('ues/{ueId}/deadline/update', [UeController::class, 'updateDeadline'])->name('ues/{ueId}/deadline/update/');
    Route::get('/staff/{staffId}/ues', [UeController::class, 'getUeFromStaff'])->name('/staff/{staffId}/ues');

});

