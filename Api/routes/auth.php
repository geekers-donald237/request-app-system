<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ProfileController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login'])->middleware('guest')->name('login');
Route::post('/register', [AuthController::class, 'register'])->middleware('guest')->name('register');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum')->name('logout');
Route::post('/newsletter', [AuthController::class, 'save'])->middleware('guest')->name('newslestter');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'getProfileFromUser'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'updateUserProfile'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'deletedUserAccount'])->name('profile.destroy');
    Route::post('/update-password', [ProfileController::class, 'updateUserPassword'])->name('profile.update.password');
});
