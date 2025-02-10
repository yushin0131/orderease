import React, { useEffect } from 'react'
import ProjectModeSelect from './project-mode-select/ProjectModeSelect'
import { Render, useMode, useRender } from '../../lib/MegaMegaHooks'
import Info from './info/Info'
import CustomTool from './custom-tool/CustomTool'
import "./Project.css";
import Manage from './manage/Manage'
import { useShared } from '../useShared'
import axios from 'axios'
import SessionAuthResult from '../../auth-result/SessionAuthResult'

type Props = {}

const Project = (props: Props) => {
  const [USER_INFO, PROJECT_EDIT, CUSTOM_TOOL] = useMode(3);
  const [mode, setMode] = useRender(USER_INFO, {
    [USER_INFO]: <Info />,
    [PROJECT_EDIT]: <Manage />,
    // [CUSTOM_TOOL]: <CustomTool />,
  })

  // const {setShared,user}=useShared.states();

  useEffect(()=>{
    const isPrevMenuProjectEdit=sessionStorage.getItem("is-prev-menu-project-edit")=="true";
    sessionStorage.removeItem("is-prev-menu-project-edit");
    if(isPrevMenuProjectEdit){
      setMode(PROJECT_EDIT);
    }
  },[])
  
  return (
    <div style={{display: "grid",gridTemplateColumns:"1fr 4fr"}}>
      <ProjectModeSelect modes={[USER_INFO, PROJECT_EDIT, /*CUSTOM_TOOL*/]} setMode={setMode} />
      <div className="project-mode-content">
        <Render mode={mode} />
      </div>
    </div>
  )
}

export default Project