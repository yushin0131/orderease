<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewProjectAdd\StoreRequest;
use App\Models\NewProject;
use Exception;
use Illuminate\Http\Request;

class NewProjectAddController extends Controller
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
        try{
        $wrapUser = SessionValidator::execute($request);
        if (!$wrapUser) {
            return [
                'isSessionValid' => false,
            ];
        }

        $project = new NewProject();
        $project->wrap_user_id = $wrapUser->id;
        $project->title = $request->get('title');

        // サムネイルのget内容がnullであれば、デフォルトのサムネイルURLを設定する。
        $project->thumbnail = $request->get('thumbnail');

        $project->is_published = false;
        $project->html_code = "";
        $project->save();
        return [
            'isSessionValid' => true,
            'project' => $project,
        ];
    }catch(Exception $ex){
        return $ex;
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
