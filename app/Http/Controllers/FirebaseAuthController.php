<?php

namespace App\Http\Controllers;

use App\Http\Requests\FirebaseAuth\StoreRequest;
use App\Models\Session;
use App\Models\User;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Str;

class FirebaseAuthController extends Controller
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
    public function store(StoreRequest $request)
    {
        $token = $request->get('token');
        $tokenInfos = $this->verifyFirebaseToken($token);
        $localId = $tokenInfos['localId'];
        $email = $tokenInfos['email'];
        $displayName = $tokenInfos['displayName'];
        $user = User::where('email', $email)->first();
        if ($user == null) {
            $user = new User();
            $user->name = $displayName;
            $user->email = $email;
            $user->save();
        }

        $session = new Session();
        $session->user_id = $user->id;
        $session->session_id = Str::random(40);
        $session->expires_at = now()->addHours(1);
        $session->save();

        $userData = [
            'name' => $user->name,
            'projects' => $user->projects,
            'customTools' => $user->customTools,
        ];

        if ($localId) {
            return [
                'isSuccess' => true,
                'sessionId' => $session->session_id,
                'email' => $user->email,
                'user' => $userData,
            ];
        } else {
            return [
                'isSuccess' => false,
                'message' => 'Authentication failed: Your token is not valid.',
            ];
        }
    }


    private function verifyFirebaseToken($token)
    {
        $client = new Client();
        $apiKey = "AIzaSyDy7bq0Pb52zg0YVwX2c20YqSIZjpE8-SY";

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
