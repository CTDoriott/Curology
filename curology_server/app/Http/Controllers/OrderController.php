<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;

/**
 * Controller for the Order class to permit core CRUD operations.
 */
class OrderController extends Controller
{
    /**
     * Error key associated with a user requesting more products than they are allowed to purchase
     */
    const PRODUCT_LIMIT_REACHED_KEY = 'OVER_LIMIT';
    /**
     * Creates an order based on the request's JSON data
     * @param Request $request - Utilized to access JSON data neatly
     * @return mixed[] - Array containing new record's ID
     */
    public function addOrder(Request $request)
    {
        try {
            // Prior to placing an order, ensure the user can still order products
            $qtyRequest = $request->input('quantity');
            $currentUser = User::where('email', $request->input('email'))->first();
            $existingProductCount = $currentUser ? $currentUser->getUserMonthProductCount() : 0;
            if ($existingProductCount + $qtyRequest > Order::MAX_PRODUCT_QTY_MONTHLY) {
                return response()->json([
                    'error_type' => self::PRODUCT_LIMIT_REACHED_KEY,
                    'existing_product_count' => $existingProductCount
                ], 400, [], JSON_NUMERIC_CHECK);
            }

            if (!$currentUser) {
                try {
                    // In a live project, we would need to validate fields, sanitize, etc.to provide a simple, actionable user message
                    // Given this is a simplistic demo, let the order creation fail if the data isn't right
                    $currentUser = User::create([
                        'firstName' => $request->input('firstName'),
                        'lastName' => $request->input('lastName'),
                        'email' => $request->input('email'),
                    ]);
                } catch (\Exception $e) {
                    throw new \Exception('Unable to create user. Please ensure all fields are present and contain values.');
                }

            }

            // In a live project, we would need to validate fields, sanitize, etc. to provide a simple, actionable user messag
            // Given this is a simplistic demo, let the order creation fail if the data isn't right
            try {
                $newOrder = $currentUser->orders()->create([
                    'street1' => $request->input('address.street1'),
                    'street2' => $request->input('address.street2'),
                    'city' => $request->input('address.city'),
                    'zipcode' => $request->input('address.zip'),
                    'state' => $request->input('address.state'),
                    'phone' => $request->input('phone'),
                    'sku' => 'DEFAULT_PRODUCT',
                    'total' => $request->input('total'),
                    'qty' => $request->input('quantity'),
                    'cc_number' => $request->input('payment.ccNum'),
                    'cc_expiration' => $request->input('payment.exp')
                ]);
            } catch (\Exception $e) {
                throw new \Exception('Unable to create order. Please ensure all fields are present and contain values.');
            }

            return response()->json(['id' => $newOrder->id], 201, [], JSON_NUMERIC_CHECK);
        } catch (\Throwable $t) {
            $exceptionCode =  (int) $t->getCode() > 400 ? $t->getCode() : 400;
            return response()->json($t->getMessage(), $exceptionCode, [], JSON_NUMERIC_CHECK);
        }
    }

    /**
     * Retrieves an order and returns it with the correct formatting
     * @param int $id - The ID for the order we wish to fetch
     * @return @mixed[] - Array containing the order information
     */
    public function getOrder($id)
    {
        try {
            $order = Order::find($id);
            if (!$order) {
                throw \Exception('resource not found', 404);
            }

            $user = User::where('id', $order->user_id)->first();
            $returnArray = [
                'firstName' => $user->firstName,
                'lastName' => $user->lastName,
                'email' => $user->email,
                'address' => [
                    'street1' => $order->street1,
                    'street2' => $order->street2,
                    'city' => $order->city,
                    'state' => $order->state,
                    'zip' => $order->zip,
                ],
                'phone' => $order->phone,
                'payment' => [
                    'ccNum' => $order->cc_number,
                    'exp' => $order->cc_expiration,
                ],
                'quantity' => $order->qty,
                'total' => $order->total,
                'orderDate' => $order->created_at,
                'fulfilled' => (bool) $order->fulfilled
            ];

            return response()->json($returnArray, 200, [], JSON_NUMERIC_CHECK);
        } catch (\Throwable $t) {
            $exceptionCode =  (int) $t->getCode() > 400 ? $t->getCode() : 400;
            return response()->json($t->getMessage(), $exceptionCode, [], JSON_NUMERIC_CHECK);
        }
    }

    /**
     * Updates an order based on the request's JSON data
     * @param Request $request - Utilized to access JSON data neatly
     * @returns mixed[] - Result of the update request (204 if successful, 400+ if not successful)
     */
    public function updateOrder(Request $request)
    {
        try {
            $orderData = json_decode($request->getContent(), true);
            $id = $request->input('id');
            $order = Order::find($id);
            $user = User::find($order->user_id);
            if (!$id) {
                throw \Exception('resource not found', 404);
            }

            $updateArray = $order->buildUpdateArrayByMap($orderData);
            $userData = [];
            $orderData = [];
            foreach ($updateArray as $field => $value) {
                if (in_array($field, $order->getFillable())) {
                    $orderData[$field] = $value;
                    continue;
                }

                if (in_array($field, $user->getFillable())) {
                    $userData[$field] = $value;
                    continue;
                }
            }

            $user->update($userData);
            $order->update($orderData);
            return response()->json('', 204, [], JSON_NUMERIC_CHECK);
        } catch (\Throwable $t) {
            $exceptionCode =  (int) $t->getCode() > 400 ? $t->getCode() : 400;
            return response()->json($t->getMessage(), $exceptionCode, [], JSON_NUMERIC_CHECK);
        }
    }

    /**
     * Deletes an order based on the request's JSON data
     * @param Request $request - Utilized to access JSON data neatly
     * @returns mixed[] - Result of the update request (204 if successful, 400+ if not successful)
     */
    public function deleteOrder($id)
    {
        try {
            if (!Order::where('id', $id)->exists()) {
                throw new \Exception('resource cannot be found', 404);
            }
            $orderDeleted = Order::destroy($id);

            if (!$orderDeleted) {
                throw new \Exception('resource cannot be deleted', 400);
            }

            return response()->json('', 204, [], JSON_NUMERIC_CHECK);
        } catch (\Throwable $t) {
            $exceptionCode =  (int) $t->getCode() > 400 ? $t->getCode() : 400;
            return response()->json($t->getMessage(), $exceptionCode, [], JSON_NUMERIC_CHECK);
        }
    }
}
