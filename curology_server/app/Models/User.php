<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Model to define User entities
 */
class User extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstName',
        'lastName',
        'email',
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
     * Get orders associated with a user
     */
    public function orders()
    {
        return $this->hasMany('App\Models\Order');
    }

    /**
     * Retrieve the number of products the user has ordered so far in the past month
     */
    public function getUserMonthProductCount()
    {
        return $this->orders()
            ->where('created_at', '>=', date("Y-m-d", strtotime("-1 months")))
            ->sum('qty');
    }
}
