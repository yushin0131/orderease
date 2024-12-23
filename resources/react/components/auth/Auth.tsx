import React, { useEffect, useState } from 'react'
import { User, useShared } from '../useShared'
import "./Auth.css"
import { handleGoogleLogin } from '../../firebase/firebase'
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import FirebaseAuthResult from '../../auth-result/FirebaseAuthResult';
import SessionAuthResult from '../../auth-result/SessionAuthResult';
import AuthStatus from '../auth-status/AuthStatus';
type Props = {

}

const Auth = (props: Props) => {
    const { setShared, user, authStatus } = useShared.states();

    const googleLogin = () => {
        handleGoogleLogin((result) => {
            result.user.getIdToken().then((token) => {
                axios.post<FirebaseAuthResult>("/api/auth", { token }).then((authResult) => {
                    // 認証トークンが有効な場合
                    if (authResult.data.isSuccess) {
                        localStorage.setItem("sessionId", authResult.data.sessionId);
                        localStorage.setItem("email", authResult.data.email);
                        setShared({ user }, authResult.data.user);
                        setShared({ authStatus }, AuthStatus.LOGGED_IN);
                    }
                });

                axios.post<FirebaseAuthResult>("/api/googleauthtest", { token }).then((authResult) => {
                    // 認証トークンが有効な場合
                    console.log(authResult.data);
                });
            })
        });
    }

    return (
        <div>
            <div className='auth-description'>ノーコードで注文フォームを作りましょう！</div>
            <span className='login-row'>
                <span className="login-button" onClick={googleLogin}>
                    <FcGoogle fontSize={"50px"} />
                    <span>Google でログイン</span>
                </span>
            </span>
        </div>
    );


}

export default Auth