<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;

/**
 * Routes for creating, getting, updating, and deleting orders
 */
Route::middleware('api')->post('magic', [OrderController::class, 'addOrder']);
Route::middleware('api')->get('magic/{id}', [OrderController::class, 'getOrder']);
Route::middleware('api')->patch('magic', [OrderController::class, 'updateOrder']);
Route::middleware('api')->delete('magic/{id}', [OrderController::class, 'deleteOrder']);
