import React, { useRef, useState } from 'react'
import EditSettings from '../edit-setting/EditSetting';
import "./ProjectCard.css"
import { Project, useShared } from '../../../useShared';
type ProjectCardProps = {
  project: Project,
  hoverProject: HTMLSpanElement | null,
  setHoverProject: React.Dispatch<React.SetStateAction<HTMLSpanElement | null>>,
  setIsOptioning: React.Dispatch<React.SetStateAction<boolean>>,
  setFocusProject: React.Dispatch<React.SetStateAction<Project | null>>,
}

const ProjectCard = (props: ProjectCardProps) => {
  const { setShared, isProjectEditing, editingProject } = useShared.states();
  const cardRef = useRef<HTMLSpanElement>(null);
  const editClickEventHandler = () => {
    setShared({ isProjectEditing }, true);
    setShared({ editingProject }, props.project);
  }

  const settingClickEventHandler = () => {
    props.setFocusProject(props.project);
    props.setIsOptioning(true);
  }

  const paintEditSettings = () => {
    if (!cardRef.current) return;
    return cardRef.current == props.hoverProject ? <EditSettings editClickEvenetHandler={editClickEventHandler} settingClickEventHandler={settingClickEventHandler} /> : <></>
  }
  return (
    <span ref={cardRef} onMouseEnter={e => props.setHoverProject(e.currentTarget as HTMLSpanElement)} onMouseLeave={e => props.setHoverProject(null)}>
      <span className="projectCard">
        {paintEditSettings()}
        <img src={props.project.thumbnail} />
        <span className='card-title'>{props.project.title}</span>
      </span>

    </span>
  )
}

export { ProjectCard, type ProjectCardProps }