<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\controllers\BlogController;
use App\Http\controllers\TempImageController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('blogs',[BlogController::class,"store"]);
Route::get('blogs',[BlogController::class,"index"]);
Route::get('show/{id}',[BlogController::class,"show"]);
Route::put('update/{id}',[BlogController::class,"update"]);
Route::delete('delete/{id}',[BlogController::class,"destroy"]);


Route::post('tempimg',[TempImageController::class,'store']);
Route::get('showimg',[TempImageController::class,'show']);

//fileupload
// use App\Http\controllers\DemoController;
// Route::post('demo',[DemoController::class,'demo']);
