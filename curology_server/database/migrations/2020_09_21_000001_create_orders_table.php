<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('sku');
            $table->integer('qty');
            $table->string('total');
            $table->string('street1');
            $table->string('street2')->nullable();
            $table->string('phone');
            $table->string('city');
            $table->string('state');
            $table->string('zipcode');
            $table->string('cc_number');
            $table->string('cc_expiration');
            $table->boolean('fulfilled')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
