<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomToolAdd\StoreRequest;
use App\Models\CustomTool;
use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\File\Exception\IniSizeFileException;

class CustomToolAddController extends Controller
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
        $customToolId = $request->get('customToolId');
        $sessionId = $request->get('sessionId');
        $email = $request->get('email');
        $user = User::where('email',$email)->first();
        $sessions = $user->sessions;
        $session = null;
        // 渡されたセッションIDが有効かどうかを確認する
        for($i = 0;$i<count($sessions);$i++){
            if($sessions[$i]['session_id']==$sessionId){
                $session=$sessions[$i];
                break;
            }
        }
        
        $isExist = CustomTool::where('custom_tool_id',$customToolId)->exists();
        if(!$isExist&&$session&&$session['session_id']==$user->sessions[count($user->sessions)-1]['session_id']&&!Carbon::now()->greaterThan($session['expires_at'])){
            $customTool= new CustomTool();
            $customTool->title = $request->get('title');
            // サムネイルのget内容がnullであれば、デフォルトのサムネイルURLを設定する。
            $customTool->thumbnail = $request->get('thumbnail');
            $customTool->html_code="";
            $customTool->is_published=false;
            $customTool->user_id=$user->id;
            $customTool->custom_tool_id=$customToolId;
            $customTool->save();
            return[
                'isSessionValid'=>true,
                'customId'=>$customTool->id,
            ];
        }else{
            return[
                'isSessionValid'=>false,
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
