import React, { useState, useRef, useEffect } from 'react'
import './Option.css';
import { AiFillAndroid } from "react-icons/ai";
import "./Option.css"
import { Project, useShared } from '../../useShared';
import sessionAuth from '../../../session-auth/sessionAuth';
import axios from 'axios';
type Props = {
  project:Project,
  setIsOptioning: React.Dispatch<React.SetStateAction<boolean>>,
}

const Option = (props: Props) => {
  const {setShared,user}=useShared.states();
  const titleRef=useRef<HTMLInputElement>(null);
  const [position, setPosition] = useState<number | null>(null);
  const publicRef = useRef<HTMLSpanElement | null>(null);
  const [isPublicOptionHidden, setIsPublicOptionHidden] = useState(true);

  useEffect(() => {
    if (publicRef.current) {
      const position = publicRef.current.offsetLeft;
      setPosition(position);
      setIsPublicOptionHidden(false);
    }
  }, []);

  window.onresize = () => {
    if (publicRef.current) {
      const position = publicRef.current.offsetLeft;
      setPosition(position);
    }
  }


  // 画面上部に更新中を表す丸みたいなやつ表示して、更新完了したら更新完了って表示したい
  const outRangeClickEventHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if(titleRef.current){
      const {emailOrOriginUserId,sessionId,authType}=sessionAuth();
      const projectId = props.project.id;
      const thumbnail = props.project.thumbnail;
      const title = titleRef.current.value;
      const isPublished = props.project.is_published;
      const htmlCode=props.project.html_code;
      axios.post("/api/newprojectupdate", {
         emailOrOriginUserId,sessionId,authType, projectId: `${projectId}`, thumbnail, title, isPublished: `${isPublished}`, htmlCode,
      }).then(res => {
        user?.projects.filter(project => project.id == props.project.id).forEach(project => {
          // 変更したものはすべてここで適用
          project.title=title;
          // タイトルの変更が表示上変わっていない
        })
        // 保存完了を表す表示を行う
      })
    }
    
    
    const target = event.target as HTMLElement;
    if (target.classList.contains('op-black-filter')) {
      props.setIsOptioning(false);
    }
  };

  // 画像の変更も可能にしなきゃいけない

  return (
    <div className="option" style={{ position: "absolute", top: "0px", width: "100%" }} onClick={outRangeClickEventHandler}>
      <div className="op-black-filter" />
      <div className="op-content">
        

        <div className="op-title">
          プロジェクト名：<input ref={titleRef} defaultValue={props.project.title}/>
        </div>
        {position?<div className="op-screen">
          <span style={{ position: "absolute",left:position }}>
            <span>画面設定：</span>
            <span className="op-button" onClick={e => (e.currentTarget)}>縦</span>
            <span className="op-button" onClick={e => (e.currentTarget)}>横</span>
            <span className="op-button" onClick={e => (e.currentTarget)}>自動</span>
          </span>
        </div>:<></>}
        <div className="op-public">
          <span ref={publicRef} style={{ position: "relative",visibility:isPublicOptionHidden?"hidden":"visible" }}>
            <span>公開設定：</span>
            <span className="op-button" onClick={e => (e.currentTarget)}>公開</span>
            <span className="op-button" onClick={e => (e.currentTarget)}>非公開</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Option