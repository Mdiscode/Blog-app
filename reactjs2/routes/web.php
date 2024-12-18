<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
// use App\Http\controllers\BlogController;
// Route::get('blog',[BlogController::class,'store']);


///
use App\Http\Controllers\FileController;
Route::get('file-upload', [FileController::class, 'index'])->name('file.upload');

Route::post('file-upload', [FileController::class, 'store'])->name('file.upload.store');

