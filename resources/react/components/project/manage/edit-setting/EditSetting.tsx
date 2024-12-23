// EditSettings.tsx
import React from 'react';
import "./EditSetting.css"
import { useShared } from '../../../useShared';

type Props={
  editClickEvenetHandler:()=>void,
  settingClickEventHandler:()=>void,
}

const EditSettings = (props:Props) => {
  return (
    <div className="edit-settings">
      <button className="edit-button" onClick={props.editClickEvenetHandler}>編集</button>
      <button className="settings-button" onClick={props.settingClickEventHandler}>設定</button>
    </div>
  );
};

export default EditSettings;
