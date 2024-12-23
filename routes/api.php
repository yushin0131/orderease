<?php

use App\Http\Controllers\CustomToolAddController;
use App\Http\Controllers\CustomToolUpdateController;
use App\Http\Controllers\FirebaseAuthController;
use App\Http\Controllers\FormProjectAddController;
use App\Http\Controllers\FormProjectUpdateController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\NewCustomToolAddController;
use App\Http\Controllers\NewCustomToolUpdateController;
use App\Http\Controllers\NewProjectAddController;
use App\Http\Controllers\NewProjectGetController;
use App\Http\Controllers\NewProjectUpdateController;
use App\Http\Controllers\NewSessionAuthController;
use App\Http\Controllers\OriginUserLoginController;
use App\Http\Controllers\OriginUserSignUpController;
use App\Http\Controllers\ProductAddController;
use App\Http\Controllers\SessionAuthController;
use App\Http\Controllers\UserUpdateController;
use App\Models\FormProject;
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

Route::resource("auth",FirebaseAuthController::class);
Route::resource("session",SessionAuthController::class);
Route::resource("formprojectadd",FormProjectAddController::class);
Route::resource("formprojectupdate",FormProjectUpdateController::class);
Route::resource("customtooladd",CustomToolAddController::class);
Route::resource("customtoolupdate",CustomToolUpdateController::class);
Route::resource("googleauth",GoogleAuthController::class);
Route::resource("originusersignup",OriginUserSignUpController::class);
Route::resource("originuserlogin",OriginUserLoginController::class);
Route::resource("sessionauth",NewSessionAuthController::class);
Route::resource("newprojectadd",NewProjectAddController::class);
Route::resource("newprojectupdate",NewProjectUpdateController::class);
Route::resource("newcustomtooladd",NewCustomToolAddController::class);
Route::resource("newcustomtoolupdate",NewCustomToolUpdateController::class);
Route::resource("userupdate",UserUpdateController::class);
Route::resource("newprojectget",NewProjectGetController::class);
Route::resource("productadd",ProductAddController::class);
