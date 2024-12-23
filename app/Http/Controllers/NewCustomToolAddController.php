<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewCustomToolAdd\StoreRequest;
use App\Models\NewCustomTool;
use Illuminate\Http\Request;

class NewCustomToolAddController extends Controller
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
    public function store(StoreRequest $request)
    {
        $wrapUser = SessionValidator::execute($request);
        if (!$wrapUser) {
            return [
                'isSessionValid' => false,
            ];
        }

        $title=$request->get('title');
        $thumbnail=$request->get('thumbnail');
        
        while(true){
            $custom_tool_id=$this->generateRandomString();
            if(!NewCustomTool::where('custom_tool_id',$custom_tool_id)->exists()){
                break;
            }
        }
        
        $customTool=new NewCustomTool();
        $customTool->wrap_user_id = $wrapUser->id;
        $customTool->custom_tool_id=$custom_tool_id;
        $customTool->title=$title;
        $customTool->thumbnail=$thumbnail;
        $customTool->is_published=false;
        $customTool->html_code="";
        $customTool->save();

        return [
            'isSessionValid' => true,
            'customToolId' => $customTool->id,
        ];   
    }

    private function generateRandomString($length = 15) {
        $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
    
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }
    
        return $randomString;
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
