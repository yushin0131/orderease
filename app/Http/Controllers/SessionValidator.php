<?php

namespace App\Http\Controllers;

use App\Models\GoogleUser;
use App\Models\OriginUser;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class SessionValidator
{
    public static function execute(Request $request)
    {
        try {
            $sessionId = $request->get('sessionId');
            $emailOrOriginUserId = $request->get('emailOrOriginUserId');
            $authType = $request->get('authType');

            if ($authType == 'google') {
                $email = $emailOrOriginUserId;
                $googleUser = GoogleUser::where('email', $email)->first();
                $wrapUser = $googleUser->getWrapUser();
            } else if ($authType == 'origin') {
                $originUserId = $emailOrOriginUserId;
                $originUser = OriginUser::where('origin_user_id', $originUserId)->first();
                $wrapUser = $originUser->getWrapUser();
            }

            $sessions = $wrapUser->sessions;
            $session = null;
            for ($i = 0; $i < count($sessions); $i++) {
                if ($sessions[$i]['session_id'] == $sessionId) {
                    $session = $sessions[$i];
                    break;
                }
            }
            // これまで該当ユーザに発行したセッションIDの中で最新のものであるか、セッションIDの有効期限は切れていないか、確認する
            if ($session && $session['session_id'] == $sessions[count($sessions) - 1]['session_id'] && !Carbon::now()->greaterThan($session['expires_at'])) {
                return $wrapUser;
            } else {
                return null;
            }
        } catch (Exception $ex) {
            return null;
        }
    }
}