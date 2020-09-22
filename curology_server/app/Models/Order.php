<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Model to define Order entities
 */
class Order extends Model
{
    /**
     * Number of magic product that the user can order monthly
     */
    const MAX_PRODUCT_QTY_MONTHLY = 3;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'sku',
        'qty',
        'total',
        'street1',
        'street2',
        'phone',
        'city',
        'state',
        'zipcode',
        'cc_number',
        'cc_expiration'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Returns a data mapping of the standardized input to database field names
     * @return mixed[] Array containing the mapping
     */
    public function getDataMapping() {
        return [
            'firstName' => 'firstName',
            'lastName' => 'lastName',
            'email' => 'email',
            'address' => [
                'street1' => 'street1',
                'street2' => 'street2',
                'city' => 'city',
                'state' => 'state',
                'zip' => 'zip'
            ],
            'phone' => 'phone',
            'payment' => [
                'ccNum' => 'cc_number',
                'exp' => 'cc_expiration',
            ],
            'quantity' => 'qty',
            'total' => 'total'
        ];
    }

    /**
     * @param $orderData - The order data we wish to utilize in building an update array
     * @return mixed[] - An array containing the updates as key/value pairs
     */
    public function buildUpdateArrayByMap($orderData) {
        $attributeMap = $this->getDataMapping();
        $updateArray = [];
        foreach ($orderData as $orderKey => $orderValue) {
            // Cannot update an ID, only reference from it
            if ($orderKey == 'id') {
                continue;
            }
            if (is_array($orderValue)) {
                foreach ($orderValue as $subKey => $subValue) {
                    $updateKey = $attributeMap[$orderKey][$subKey];
                    $updateArray[$updateKey] = $subValue;
                }
                continue;
            }

            $updateArray[$attributeMap[$orderKey]] = $orderValue;
        }

        return $updateArray;
    }
}
