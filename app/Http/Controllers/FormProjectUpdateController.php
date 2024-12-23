<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormProjectUpdate\StoreRequest;
use App\Models\FormProject;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class FormProjectUpdateController extends Controller
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
        $sessionId = $request->get('sessionId');
        $email = $request->get('email');
        $title = $request->get('title');
        $thumbnail = $request->get('thumbnail');
        $projectId = $request->get('projectId');
        $sessionId = $request->get('sessionId');
        $isPublished = $request->get('isPublished');
        $htmlCode = $request->get('htmlCode');
        $project = FormProject::find($projectId);

        $user = User::where('email', $email)->first();
        $sessions = $user->sessions;
        $session = null;

        // 渡されたセッションIDが有効かどうかを確認する
        for ($i = 0; $i < count($sessions); $i++) {
            if ($sessions[$i]['session_id'] == $sessionId) {
                $session = $sessions[$i];
            }
        }

        if ($session && $session['session_id'] == $user->sessions[count($user->sessions) - 1]['session_id'] && !Carbon::now()->greaterThan($session['expires_at'])) {

            $project->title = $title;
            $project->thumbnail = $thumbnail;
            $project->is_published = $isPublished;
            $project->html_code = $htmlCode;
            $project->save();
            return [
                'isSessionValid' => true,
            ];
        } else {
            return [
                'isSessionValid' => false,
            ];
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
