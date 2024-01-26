<?php

use App\Http\Controllers\RequestManagement\RequestController;
use App\Http\Controllers\RequestManagement\RequestPatternController;
use App\Http\Controllers\UeManagement\UeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {

    return $request->user();
});


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/request/patterns', [RequestPatternController::class, 'getAllRequestPatterns'])->name('request/patterns');
    Route::get('/staff', [RequestController::class, 'getAllStaff'])->name('staff');
    Route::get('/users', [RequestController::class, 'getAllUser'])->name('user');
    Route::post('/request', [RequestController::class, 'save'])->name('request');
    Route::post('/request/send', [RequestController::class, 'sendRequest'])->name('/request/send');
    Route::get('/student/{studentId}/requests', [RequestController::class, 'getStudentRequests'])->name('/student/{studentId}/requests');
    Route::delete('/request/{requestId}', [RequestController::class, 'deleteRequest'])->name('request.delete');
    Route::post('/requests/{requestId}', [RequestController::class, 'updateRequest'])->name('/requests/{requestId}');
    Route::get('/requests/{requestId}', [RequestController::class, 'getRequest'])->name('/requests/{requestId}');
    Route::get('/student/{senderId}', [RequestController::class, 'getStudentInformation'])->name('/student/{sendId}');

    Route::get('/staff/{staffId}/requests', [RequestController::class, 'getStaffRequests'])->name('/staff/{staffId}/requests');
    Route::get('/secretary/{secretary}/requests', [RequestController::class, 'getSecretaryRequests'])->name('/secretary/{secretary}/requests');
    Route::patch('/request/{requestId}/statut/{statut}/', [RequestController::class, 'updateRequestStatus'])->name('/request/statut');
    Route::get('/student/{studentId}/studentDetails', [RequestController::class, 'getStudentDetails'])->name('/student/{studentId}/studentDetails');
    Route::get('/ue', [UeController::class, 'getUes'])->name('/ue');
    Route::get('requests/{requestId}/history', [RequestController::class, 'getRequestHistory'])->name('requests/{requestId}/history');

});

require __DIR__ . '/auth.php';

