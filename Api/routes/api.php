<?php

use App\Http\Controllers\RequestManagement\RequestController;
use App\Http\Controllers\RequestManagement\RequestPatternController;
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
    Route::post('/request', [RequestController::class, 'save'])->name('request');
    Route::post('/request/send', [RequestController::class, 'sendRequest'])->name('/request/send');
    Route::get('/student/{studentId}/requests', [RequestController::class, 'getStudentRequests'])->name('/users/{userId}/requests');
    Route::patch('/request/{requestId}', [RequestController::class, 'deleteRequest'])->name('/request/delete');
    Route::patch('/request/{requestId}/update', [RequestController::class, 'updateRequest'])->name('/request/{requestId}/update');

    Route::get('/staff/{staff_id}/requests', [RequestController::class, 'getStaffRequests'])->name('/staff/{staff_id}/requests');
});


require __DIR__ . '/auth.php';
