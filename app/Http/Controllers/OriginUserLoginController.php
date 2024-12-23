<?php

namespace App\Http\Controllers;

use App\Http\Requests\OriginUserLogin\StoreRequest;
use App\Models\NewSession;
use App\Models\OriginUser;
use App\Models\WrapUser;
use Illuminate\Http\Request;
use Str;

class OriginUserLoginController extends Controller
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
        
        $originUserId = $request->get('originUserId');
        $password = $request->get('password');
        $originUser = OriginUser::where('origin_user_id', $originUserId)->first();
        if(!$originUser||$originUser->password!=$password){
            return [
                'isSuccess'=>false,
            ];
        }

        $wrapUser=WrapUser::find($originUser->wrap_user_id);
        
        $session = new NewSession();
        $session->wrap_user_id = $wrapUser->id;
        $session->session_id = Str::random(40);
        $session->expires_at = now()->addHours(1);
        $session->save();

        $userData = [
            'name' => $wrapUser->name,
            'icon' => $wrapUser->icon,
            'projects' => $wrapUser->projects,
            'customTools' => $wrapUser->customTools,
        ];

        return [
            'isSuccess' => true,
            'sessionId' => $session->session_id,
            'emailOrOriginUserId' => $originUserId,
            'authType' => 'origin',
            'user' => $userData,
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
