<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewProjectUpdate\StoreRequest;
use App\Models\NewProject;
use Exception;
use Illuminate\Http\Request;

class NewProjectUpdateController extends Controller
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
        $title = $request->get('title');
        $thumbnail = $request->get('thumbnail');
        $projectId = $request->get('projectId');
        $isPublished = $request->get('isPublished');
        $htmlCode = $request->get('htmlCode');
        $deployHtmlCode=$request->get('deployHtmlCode');
        $wrapUser = SessionValidator::execute($request);

        if (!$wrapUser) {
            return [
                "isSessionValid" => false,
            ];
        }

        $project = NewProject::find($projectId);

        $project->title = $title;
        $project->wrap_user_id = $wrapUser->id;
        $project->thumbnail = $thumbnail;
        $project->is_published = $isPublished;
        $project->html_code = $htmlCode;
        $project->deployHtmlCode=$deployHtmlCode;
        $project->save();
        return [
            'isSessionValid' => true,
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
