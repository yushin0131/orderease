import React, { useState } from 'react';
import "./UserProfile.css";
import { useShared } from '../../../useShared';
import axios from 'axios';
import sessionAuth from '../../../../session-auth/sessionAuth';
import { uploadImage } from '../../../../firebase/firebase';


type Props = {
  icon: string;
  name: string;
  altText?: string;
};

const UserProfile = (props: Props) => {
  const [icon,setIcon]=useState(props.icon);
  const [name, setName] = useState(props.name);

  const { setShared,user } = useShared.states();

  // 文字数をカウントする関数
  const calculateLength = (input: string) => {
    let length = 0;
    for (const char of input) {
      // 全角文字は1文字、半角文字は0.5文字
      if (char.match(/[^\x00-\x7F]/)) {
        length += 1; // 全角文字
      } else {
        length += 0.5; // 半角文字
      }
    }
    return length;
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value; // 入力内容を取得
    if (calculateLength(newName) <= 15) { // 15文字以内なら更新
      setName(newName);
    }
  };

  const handleSave = () => {
    const {sessionId,emailOrOriginUserId,authType}=sessionAuth();
    // ユーザ情報を更新するapiにリクエスト
    axios.post<{isSessionValid:boolean}>("/api/userupdate", {
      sessionId,emailOrOriginUserId,authType,
      icon,
      name,
    }).then(res => {
      console.log(res.data);
      if(res.data.isSessionValid){
        if(user){
          user.icon=icon;
          user.name=name;
        }
      }
    })

  };

  const handleIconChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const file=event.target.files?.[0];

    if (file) {
      const url = await uploadImage(file);
      setIcon(url?url:"");
    } else {
      console.error("No file selected for upload.");
    }

    // if(!file){
    //   alert("ファイルが選択されていません");
    //   return;
    // }
    // if(!file.type.startsWith("image/")){
    //   alert("画像ファイルを選択してください");
    //   return;
    // }
    // const reader=new FileReader();
    // reader.onload=()=>{
    //   setIcon(reader.result as string);
    // };
    // reader.onerror=()=>{
    //   alert("ファイルを読み取れませんでした");
    // };
    // reader.readAsDataURL(file);
  }

  return (
    <div className="userProfile-container">

      <label style={{cursor:"pointer"}}>
        <input type="file" accept="image" onChange={handleIconChange} style={{ display: "none" }}/>
        <img src={icon} className="userProfile-image" alt={props.altText || "プロフィール"} />
      </label>
      <input
        value={name} // defaultValueからvalueに変更
        onChange={handleNameChange}
        className="userProfile-name-input"
        placeholder="名前を入力"
      />
      <button onClick={handleSave} className="userProfile-save-button">保存</button> {/* 保存ボタンを追加 */}
    </div>
  );
};

export default UserProfile;
