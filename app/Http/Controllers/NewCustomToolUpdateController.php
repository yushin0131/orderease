<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewCustomToolUpdate\StoreRequest;
use App\Models\NewCustomTool;
use Exception;
use Illuminate\Http\Request;

class NewCustomToolUpdateController extends Controller
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
        if (!$wrapUser) {
            return [
                'isSessionValid' => false,
            ];
        }


        // テーブルでいうid
        $intCustomToolId = $request->get('intCustomToolId');
        // テーブルでいうcustom_tool_id
        $stringCustomToolId = $request->get('stringCustomToolId');
        $title = $request->get('title');
        $thumbnail = $request->get('thumbnail');
        $isPublished = $request->get('isPublished');
        $htmlCode = $request->get('htmlCode');


        $customTool = NewCustomTool::find($intCustomToolId);
        $customTool->custom_tool_id = $stringCustomToolId;
        $customTool->title = $title;
        $customTool->thumbnail = $thumbnail;
        $customTool->is_published = $isPublished;
        $customTool->html_code = $htmlCode;
        $customTool->save();

        return [
            'isSessionValid' => true,
        ];
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
