<?php

namespace App\Http\Controllers;

use App\Models\NewProject;
use App\Models\Order;
use Exception;
use Illuminate\Http\Request;

class OrderGetController extends Controller
{
    public function store(Request $request)
    {

        try {
            $project = NewProject::find($request->get("projectId"));
            $orders = Order::where("is_served", false)->where("project_id", $project->id)->where("is_check",false)->get();
            return $orders;
        } catch (Exception $ex) {
            return $ex;
        }
    }
}
