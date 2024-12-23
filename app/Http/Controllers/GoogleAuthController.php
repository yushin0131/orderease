<?php

namespace App\Http\Controllers;

use App\Http\Requests\GoogleAuth\StoreRequest;
use App\Models\GoogleUser;
use App\Models\NewSession;
use App\Models\User;
use App\Models\WrapUser;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Request;
use Str;

class GoogleAuthController extends Controller
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
        $token = $request->get('token');
        $tokenInfos = $this->verifyFirebaseToken($token);
        
        $localId = $tokenInfos['localId'];
        if (!$localId) {
            return ['isSuccess' => false,];
        }
  
        $email = $tokenInfos['email'];
        $displayName = $tokenInfos['displayName'];
  
        $googleUser = GoogleUser::where('email', $email)->first();

        if (!$googleUser) {
            // 新規の場合
            $wrapUser = new WrapUser();
            $wrapUser->name = $displayName;
            $wrapUser->icon = '';
            $wrapUser->save();
            $googleUser = new GoogleUser();
            $googleUser->wrap_user_id = $wrapUser->id;
            $googleUser->email = $email;
            $googleUser->save();
        } else {
            // 既存の場合
            $wrapUser = WrapUser::find($googleUser->wrap_user_id);
        }


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
            'emailOrOriginUserId' => $email,
            'authType'=>'google',
            'user' => $userData,
        ];



        // if ($localId) {
        //     return [
        //         'isSuccess' => true,
        //         'sessionId' => $session->session_id,
        //         'email' => $user->email,
        //         'user' => $userData,
        //     ];
        // } else {
        //     return [
        //         'isSuccess' => false,
        //         'message' => 'Authentication failed: Your token is not valid.',
        //     ];
        // }
    }


    private function verifyFirebaseToken($token)
    {
        $client = new Client();
        $apiKey = "AIzaSyBX6yDFKifYdVdEY7bs1wz4lyztTnVepnk";

        try {
            $response = $client->post("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=$apiKey", [
                'json' => [
                    'idToken' => $token,
                ],
            ]);

            $data = json_decode($response->getBody(), true);
            return [
                'localId' => $data['users'][0]['localId'],
                'email' => $data['users'][0]['email'],
                'displayName' => $data['users'][0]['displayName'],
            ];
        } catch (RequestException $ex) {
            return null;
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
