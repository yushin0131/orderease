import React, { useState, useRef, useEffect } from 'react';
import './PageSelect.css';
import { useShared } from '../useShared';
import { UseShared } from '../../lib/MegaMegaHooks';

type Props = {
  menus: symbol[],
  menu: symbol,
  setMenu: React.Dispatch<React.SetStateAction<symbol>>
}

const PageSelect = (props: Props) => {
  const [HOME, PROJECT, AUTH, ACCESS_CONTROLLER] = props.menus;
  const { setShared, pageSelectHeight } = useShared.states();

  // 選択中のメニューラベルのx
  const [position, setPosition] = useState(0);
  // 選択中のメニューラベルの幅
  const [width, setWidth] = useState(50); // Barの幅

  const [fadeClass, setFadeClass] = useState('prev-fade-in'); // フェードアウトクラスの状態管理
  const barRef = useRef(null);
  const homeRef = useRef<HTMLSpanElement | null>(null);
  const projectRef = useRef<HTMLSpanElement | null>(null);
  const projectSelectRef = useRef(null);
  const moveTo = (target: EventTarget & HTMLSpanElement) => {
    const button = target;
    const buttonPosition = button.offsetLeft; // クリックされたボタンの位置
    const buttonWidth = button.offsetWidth;   // クリックされたボタンの幅

    setPosition(buttonPosition);              // Barの位置を変更
    setWidth(buttonWidth);                    // Barの幅をボタンの幅に変更
  };
  const menuSelectEventHandler = (target: EventTarget & HTMLSpanElement, menu: symbol) => {
    moveTo(target);
    switch (menu) {
      case HOME:
        sessionStorage.setItem("menu", "home");
        props.setMenu(HOME);
        break;
      case ACCESS_CONTROLLER:
        if (props.menu != AUTH || props.menu != PROJECT) {
          sessionStorage.setItem("menu", "access-controller")
          props.setMenu(ACCESS_CONTROLLER);
        }
        break;
    }
  }

  const setPageSelectBar = () => {
    if (projectRef.current) {
      setShared({ pageSelectHeight }, projectRef.current.getBoundingClientRect().height);
    }
    const sessionMenu = sessionStorage.getItem("menu");
    let position = 0;
    let width = 0;
    if (sessionMenu == "home" && homeRef.current) {
      position = homeRef.current.offsetLeft; // HOMEボタンの位置
      width = homeRef.current.offsetWidth;   // HOMEボタンの幅
    } else if ((sessionMenu == "access-controller" || props.menu == AUTH || props.menu == PROJECT) && projectRef.current) {
      position = projectRef.current.offsetLeft; // POSITIONボタンの位置
      width = projectRef.current.offsetWidth;   // POSITIONボタンの幅
    }
    setFadeClass('fade-in');
    setPosition(position);                       // 初期位置
    setWidth(width);
  }

  useEffect(() => {
    if (projectRef.current) {
      setShared({ pageSelectHeight }, projectRef.current.getBoundingClientRect().height);
    }

    // 初期値をHOMEボタンの位置と幅に設定

    const sessionMenu = sessionStorage.getItem("menu");
    let position = 0;
    let width = 0;
    if ((sessionMenu == null || sessionMenu == "home") && homeRef.current) {
      position = homeRef.current.offsetLeft; // HOMEボタンの位置
      width = homeRef.current.offsetWidth;   // HOMEボタンの幅
    } else if (sessionMenu == "access-controller" && projectRef.current) {
      position = projectRef.current.offsetLeft; // POSITIONボタンの位置
      width = projectRef.current.offsetWidth;   // POSITIONボタンの幅
    }
    setFadeClass('fade-in');
    setPosition(position);                       // 初期位置
    setWidth(width);



    window.addEventListener("resize", setPageSelectBar)

    return () => {
      window.removeEventListener("resize", setPageSelectBar)
    };

  }, []);

  return (
    <div className="pageSelect" ref={projectSelectRef}>
      <span className={`Menubar ${fadeClass}`} ref={homeRef} onClick={e => menuSelectEventHandler(e.currentTarget, HOME)}>HOME</span>
      <span className={`Menubar ${fadeClass}`} ref={projectRef} onClick={e => menuSelectEventHandler(e.currentTarget, ACCESS_CONTROLLER)}>PROJECT</span>
      {/* <span className={`Menubar ${fadeClass}`} onClick={e=>moveTo(e.currentTarget)}>INQUIRY</span> */}
      <div className="Bar"
        style={{
          transform: `translateX(${position - 3}px)`,
          width: `${width + 6}px`,
        }}
        ref={barRef}>
      </div>
      <span className="headerTitle">
        Order Ease
      </span>
    </div>
  );
}

export default PageSelect;