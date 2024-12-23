import React, { useEffect, useRef } from 'react'
import "./ProjectModeSelect.css"
import { v4 as uuid } from 'uuid';
import { FaUserCircle } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { IoIosListBox } from "react-icons/io";
type Props = {
  modes: symbol[],
  setMode: React.Dispatch<React.SetStateAction<symbol>>
}





const ProjectModeSelect = (props: Props) => {
  const [USER_INFO, PROJECT_EDIT, CUSTOM_TOOL] = props.modes;
  const modes = {
    [USER_INFO]: <div className="projectModeSelectIcon"><FaUserCircle size="5vw" />&nbsp;ユーザ情報</div>,
    [PROJECT_EDIT]: <div className="projectModeSelectIcon"><IoIosListBox size="5vw" />&nbsp;プロジェクト編集</div>,
    [CUSTOM_TOOL]: <div className="projectModeSelectIcon"><div style={{ width: "5vw", textAlign: "center" }}><FaTools size="4.3vw" /></div>&nbsp;カスタムツール</div>,
  }
  const paintModes = () => {
    return props.modes.map(mode => <div key={uuid()} onClick={() => props.setMode(mode)}>{modes[mode]}</div>);
  }
  return (
    <div className='projectModeSelect'>
      {paintModes()}
    </div>
  )
}

export default ProjectModeSelect