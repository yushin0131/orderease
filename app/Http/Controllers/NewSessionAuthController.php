<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewSessionAuth\StoreRequest;
use App\Models\GoogleUser;
use App\Models\OriginUser;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class NewSessionAuthController extends Controller
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
        if ($wrapUser) {
            $userData = [
                'name' => $wrapUser->name,
                'icon' => $wrapUser->icon,
                'projects'=>$wrapUser->projects,
                'customTools'=>$wrapUser->customTools,
            ];
            return [
                'isSessionValid' => true,
                'user' => $userData,
            ];
        } else {
            return [
                'isSessionValid' => false,
            ];
        }
        // try {
        //     $sessionId = $request->get('sessionId');
        //     $emailOrOriginUserId = $request->get('emailOrOriginUserId');
        //     $authType = $request->get('authType');

        //     if ($authType == 'google') {
        //         $email = $emailOrOriginUserId;
        //         $googleUser = GoogleUser::where('email', $email)->first();
        //         $wrapUser = $googleUser->getWrapUser();
        //     } else if ($authType == 'origin') {
        //         $originUserId = $emailOrOriginUserId;
        //         $originUser = OriginUser::where('origin_user_id', $originUserId)->first();
        //         $wrapUser = $originUser->getWrapUser();
        //     }

        //     $sessions = $wrapUser->sessions;
        //     $session = null;
        //     for ($i = 0; $i < count($sessions); $i++) {
        //         if ($sessions[$i]['session_id'] == $sessionId) {
        //             $session = $sessions[$i];
        //             break;
        //         }
        //     }
        //     // これまで該当ユーザに発行したセッションIDの中で最新のものであるか、セッションIDの有効期限は切れていないか、確認する
        //     if ($session && $session['session_id'] == $sessions[count($sessions) - 1]['session_id'] && !Carbon::now()->greaterThan($session['expires_at'])) {
        //         // セッションログイン成功。FirebaseAuthControllerのログイン時と同じデータを返す
        //         $userData = [
        //             'name' => $wrapUser->name,
        //             'icon' => $wrapUser->icon,
        //             // 'projects'=>$user->projects,
        //             // 'customTools'=>$user->customTools,
        //         ];
        //         return [
        //             'isSessionValid' => true,
        //             'user' => $userData,
        //         ];
        //     } else {
        //         return [
        //             'isSessionValid' => false,
        //         ];
        //     }
        // } catch (Exception $ex) {
        //     return [
        //         'isSessionValid' => false,
        //     ];
        // }
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
