<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Exception;
use Illuminate\Http\Request;

class OrderAddController extends Controller
{
    public function store(Request $request){

        try{
        $seat_number = $request->get('seatId');
        $project_id = $request->get('projectId');
        $product_name = $request->get('productName');
        $quantity = $request->get('quantity');
        $price = $request->get('price');
        $is_served = false;
        $order = new Order();
        $order->seat_number = $seat_number;
        $order->project_id = $project_id;
        $order->product_name = $product_name;
        $order->quantity = $quantity;
        $order->price = $price;
        $order->is_served = $is_served;
        $order->save();
        return $order;
        }catch(Exception $ex){
            return $ex;
        }
    }
    
}

