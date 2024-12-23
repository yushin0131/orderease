import React, { useEffect, useRef, useState } from 'react'
import './Manage.css';
import { ProjectCard } from './project-card/ProjectCard';
import { title } from 'process';
import { Project, useShared } from '../../useShared';
import axios from 'axios';
import Option from '../../project-edit/option/Option';
import NewProject from './new-project/NewProject';

type Props = {}

const Manage = (props: Props) => {
  const { setShared, user, isProjectEditing, editingProject } = useShared.states();
  const [projectInfos] = useState(user?.projects);

  const [isOptioning, setIsOptioning] = useState(false);
  const [focusProject, setFocusProject] = useState<Project | null>(null);

  const [hoverProject, setHoverProject] = useState<HTMLSpanElement | null>(null);

  const [isCreatingNewProject, setIsCreatingNewProject] = useState(false);

  const paintProjectCards = () => {
    return projectInfos?.map(((project, i) => {
      return <ProjectCard key={i} project={project} hoverProject={hoverProject} setHoverProject={setHoverProject} setIsOptioning={setIsOptioning} setFocusProject={setFocusProject} />
    }))
  }

  const onNewProjectEventHandler = () => {
    setIsCreatingNewProject(true);
  }

  const [manageHeight, setManageHeight] = useState(0);
  const manageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const manageHeightSetter = () => {
      if (!manageRef.current) return;
      setManageHeight(window.innerHeight - manageRef.current.offsetTop);
    }
    manageHeightSetter();
    window.onresize = manageHeightSetter;
    return () => {
      window.onresize = null
    };
  }, [])

  return (
    <div ref={manageRef} className='manage' style={{ height: manageHeight - 30 }}>
      <div>作成したプロジェクト</div>
      <div>
        {paintProjectCards()}
      </div>
      <span className='newproject' onClick={onNewProjectEventHandler}>NEW&nbsp;PROJECT</span>
      {isOptioning && <Option setIsOptioning={setIsOptioning} project={focusProject as Project} />}
      {isCreatingNewProject&&<NewProject setIsCreatingNewProject={setIsCreatingNewProject}/>}
    </div>
  )
}

export default Manage