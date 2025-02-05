import React, { useEffect, useRef, useState } from 'react';
import UserProfile from './user-profile/UserProfile';
import PublishedProjectList from './published-project-list/PublishedProjectList';
import "./Info.css"
import { useShared } from '../../useShared';
import CheckoutFin from './orders/CheckOutFin';


type Props = {
};

const Info = (props: Props) => {
  const {user}=useShared.states();
  const projects=user?user.projects.filter(project=>project.is_published):[];
  console.log(projects);
  const infoRef = useRef<HTMLDivElement>(null);
  const [infoHeight, setInfoHeight] = useState(0);
  useEffect(() => {
    if (!infoRef.current) return;
    setInfoHeight(window.innerHeight - infoRef.current.offsetTop);
  }, [])

  return (
    <div ref={infoRef} className="info" style={{ height: infoHeight - 15 }}>
      <UserProfile icon={user?user.icon:""} name={user?user.name:""} />
      <hr />
      <PublishedProjectList projects={projects} />
    </div>
  );
}

export default Info;
