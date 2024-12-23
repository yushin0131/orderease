import React, { useState } from 'react';
import OriginAuth from './OriginAuth';
import axios from 'axios';
import { useShared } from '../useShared';
import { AuthResult } from '../../auth-result/AuthResult';
import AuthStatus from '../auth-status/AuthStatus';
import { handleGoogleLogin } from '../../firebase/firebase';

const OriginAuthHandler: React.FC = () => {
  const { setShared, user, authStatus } = useShared.states();

  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleFormSubmit = (id: string, password: string, isLogin: boolean) => {
    if (isLogin) {
      axios.post<AuthResult>("/api/originuserlogin", {
        originUserId: id,
        password: password,
      }).then(res => {
        const authResult = res.data;
        if (authResult.isSuccess) {
          localStorage.setItem("sessionId", authResult.sessionId);
          localStorage.setItem("emailOrOriginUserId", authResult.emailOrOriginUserId);
          localStorage.setItem("authType", authResult.authType);
          setShared({ user }, authResult.user);
          setShared({ authStatus }, AuthStatus.LOGGED_IN);
        } else {
          setIdError("ユーザID または パスワードが正しくありません")
        }
      });
    } else {
      axios.post<AuthResult>("/api/originusersignup", {
        originUserId: id,
        password: password,
      }).then(res => {
        const authResult = res.data;
        if (authResult.isSuccess) {
          localStorage.setItem("sessionId", authResult.sessionId);
          localStorage.setItem("emailOrOriginUserId", authResult.emailOrOriginUserId);
          localStorage.setItem("authType", authResult.authType);
          setShared({ user }, authResult.user);
          setShared({ authStatus }, AuthStatus.LOGGED_IN);
        } else {
          setIdError("すでに存在するユーザIDです")
        }
      });
    }
  };

  const googleLogin = () => {
    handleGoogleLogin((result) => {
      result.user.getIdToken().then((token) => {
        axios.post<AuthResult>("/api/googleauth", { token }).then((res) => {
          console.log(res.data);

          // googleログイン時のローカルストレージやuseSharedの操作を行う
          const authResult = res.data;
          if (authResult.isSuccess) {
            localStorage.setItem("sessionId", authResult.sessionId);
            localStorage.setItem("emailOrOriginUserId", authResult.emailOrOriginUserId);
            localStorage.setItem("authType", authResult.authType);
            setShared({ user }, authResult.user);
            setShared({ authStatus }, AuthStatus.LOGGED_IN);
          }
        });
      })
    });
  }




  return (
    <div>
      <OriginAuth idError={idError} setIdError={setIdError} passwordError={passwordError} setPasswordError={setPasswordError} googleLogin={googleLogin} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default OriginAuthHandler;
