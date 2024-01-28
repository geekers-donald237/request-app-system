<?php

use App\Http\Controllers\RequestManagement\RequestController;
use App\Http\Controllers\RequestManagement\RequestPatternController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    // Routes GET
    Route::get('/request/patterns', [RequestPatternController::class, 'getAllRequestPatterns'])->name('request/patterns');
    Route::get('/student/{studentId}/requests', [RequestController::class, 'getStudentRequests'])->name('/student/{studentId}/requests');
    Route::get('/student/{senderId}', [RequestController::class, 'getStudentInformation'])->name('/student/{sendId}');
    Route::get('/users', [RequestController::class, 'getAllUser'])->name('user');
    Route::get('/staff/{staffId}/requests', [RequestController::class, 'getStaffRequests'])->name('/staff/{staffId}/requests');
    Route::get('/secretary/{secretary}/requests', [RequestController::class, 'getSecretaryRequests'])->name('/secretary/{secretary}/requests');
    Route::get('/student/{studentId}/studentDetails', [RequestController::class, 'getStudentDetails'])->name('/student/{studentId}/studentDetails');
    Route::get('requests/{requestId}/history', [RequestController::class, 'getRequestHistory'])->name('requests/{requestId}/history');
    Route::get('/requests/{requestId}', [RequestController::class, 'getRequest'])->name('/requests/{requestId}');

    // Routes POST
    Route::post('/request', [RequestController::class, 'save'])->name('request');
    Route::post('/request/send', [RequestController::class, 'sendRequest'])->name('/request/send');
    Route::post('/requests/{requestId}', [RequestController::class, 'updateRequest'])->name('/requests/{requestId}');

    // Routes DELETE
    Route::delete('/request/{requestId}', [RequestController::class, 'deleteRequest'])->name('request.delete');

    // Routes PATCH
    Route::patch('/request/{requestId}/statut/{statut}/', [RequestController::class, 'updateRequestStatus'])->name('/request/statut');
});
