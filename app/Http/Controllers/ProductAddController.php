<?php

namespace App\Http\Controllers;

use App\Models\NewProject;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;



class ProductAddController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $wrapUser = SessionValidator::execute($request);
        if ($wrapUser) {
            $projectId = $request->get('projectId');
            $project = NewProject::find($projectId);
            if ($project) {
                $name = $request->get('name');
                $price = $request->get('price');
                $thumbnail = $request->get('thumbnail');
                $product = new Product();
                $product->name = $name;
                $product->price = $price;
                $product->thumbnail = $thumbnail;
                $product->new_project_id = $projectId;
                $product->save();
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

