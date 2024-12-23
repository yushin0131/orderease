<?php

namespace App\Http\Controllers;

use App\Models\NewProject;
use Exception;
use Illuminate\Http\Request;

class NewProjectGetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
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
        try {
            $projectId = $request->get('projectId');
            $project = NewProject::find($projectId);
            $html_code = $project->deployHtmlCode;
            return [
                'htmlCode' => $html_code
            ];
        } catch (Exception $ex) {
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
     * Show the form for editing the specified resource
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

// <!-- 当ファイルはcontrollersに配置してください -->
// <!-- routes/api.phpに下記のコードを追記してください -->
// <!-- 
// Route::resource("newprojectget",NewProjectGetController::class);
// -->
// <!-- 
// API呼び出し方(フロント側)
// axios.post<{htmlCode:string}>({projectId:「プロジェクトのID」}).then(res=>{
//     const {htmlCode}=res.data;

// });
// -->