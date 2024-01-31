<?php

use Illuminate\Support\Facades\Route;
use App\Events\SendMailEvent;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});


Route::get('/test-email', function () {
    $userData = [
        'name' => 'John Doe',
        'email' => 'bayonidris@gmail.com',
    ];

    event(new SendMailEvent($userData, 'status2'));

    return 'E-mail sent successfully!';
});

