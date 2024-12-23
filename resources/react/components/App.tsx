import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Home from './home/Home';
import { Render, useMode, useRender } from '../lib/MegaMegaHooks';
import Project from './project/Project';
import Auth from './auth/Auth';
import { SharedType, useShared } from './useShared';
import PageSelect from './page-select/PageSelect';
import ProjectEdit from './project-edit/ProjectEdit';
import SessionAuthResult from '../auth-result/SessionAuthResult';
import axios from 'axios';
import AccessController from './accessController/AccessController';
import AuthStatus from './auth-status/AuthStatus';
import Pending from './pending/Pending';
import CustomToolEdit from './project/custom-tool/custom-tool-edit/CustomToolEdit';
import PublishedProjectState from './project/info/published-project-state/PublishedProjectState';
import HomeDesign from './home-test/HomeDesign';
import { AuthResult } from '../auth-result/AuthResult';

function App() {
  const MENUS = useMode(4);
  const [HOME, PROJECT, AUTH, ACCESS_CONTROLLER] = MENUS;
  const [menu, setMenu] = useRender(HOME, {
    [HOME]: <HomeDesign />,
    [PROJECT]: <Project />,
    [AUTH]: <Auth />,
    [ACCESS_CONTROLLER]: <AccessController />
  });

  useEffect(() => {
    const sessionMenu = sessionStorage.getItem("menu");
    switch (sessionMenu) {
      case "home":
        setMenu(HOME);
        break;
      case "access-controller":
        setMenu(ACCESS_CONTROLLER);
        break;
    }
  }, [])

  const share: SharedType = {
    user: null,
    pageSelectHeight: 0,
    setMenu,
    PROJECT,
    // 初期はfalse(プロジェクト編集中かどうか)
    isProjectEditing: false,
    isExtensionToolEditing: false,
    isPublishedProjectStating: false,
    authStatus: AuthStatus.PENDING,
    editingProject: null,
  }
  const { setShared, user, isProjectEditing, isExtensionToolEditing, isPublishedProjectStating, authStatus } = useShared.init(share)

  const appRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    const emailOrOriginUserId = localStorage.getItem("emailOrOriginUserId");
    const authType = localStorage.getItem("authType");
    const data = { sessionId, emailOrOriginUserId, authType };
    console.log(data)
    if (sessionId && emailOrOriginUserId && authType) {
      axios.post<SessionAuthResult>("/api/sessionauth", data).then(authResult => {
        if (authResult.data.isSessionValid) {
          console.log("有効なセッションIDの場合", authResult.data);
          setShared({ user }, authResult.data.user);
          setShared({ authStatus }, AuthStatus.LOGGED_IN);
        } else {
          console.log("無効なセッションIDの場合", authResult.data);
          localStorage.removeItem("sessionId");
          localStorage.removeItem("emailOrOriginUserId");
          localStorage.removeItem("authType");
          setShared({ authStatus }, AuthStatus.LOGGED_OUT);
        }
      }).catch((error) => {
        console.log("error")
        localStorage.removeItem("sessionId");
        localStorage.removeItem("emailOrOriginUserId");
        localStorage.removeItem("authType");
        setShared({ authStatus }, AuthStatus.LOGGED_OUT);
      })
    } else {
      setShared({ authStatus }, AuthStatus.LOGGED_OUT);
    }


    if (!appRef.current) return;

  }, [])

  const paintApp = () => {
    if (isProjectEditing) {
      return <ProjectEdit />
    } else if (isExtensionToolEditing) {
      return <CustomToolEdit />
    } else if (isPublishedProjectStating) {
      return <PublishedProjectState />
    } else {
      return authStatus == AuthStatus.PENDING && sessionStorage.getItem("menu") == "access-controller" ?
        <Pending /> :
        <>
          <PageSelect menus={MENUS} menu={menu.id} setMenu={setMenu} />
          <hr style={{ position: "absolute", left: 0, margin: 0, width: "100vw" }} />
          <Render mode={menu} />
        </>
    }
  }


  return (
    <div className="App">
      {paintApp()}
    </div>
  );
}

export default App;
