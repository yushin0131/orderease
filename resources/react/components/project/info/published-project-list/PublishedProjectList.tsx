import React from 'react';
import './PublishedProjectList.css'; // CSSスタイルのインポート
import { Project, useShared } from '../../../useShared';

// type Project = {
//   id: number;
//   title: string;
//   thumbnail: string; // 画像URLを追加
// };

type Props = {
  projects: Project[]; // プロジェクトデータを受け取るプロパティ
};

const PublishedProjectList = (props: Props) => {
  const {setShared,isPublishedProjectStating}=useShared.states();
  return (
    <div className="published-project-list">
      <div>公開されているプロジェクト</div>
      <div className="published-project-cards">
        {props.projects.map((project) => (
          <div key={project.id} className="published-project-card" onClick={()=>{setShared({isPublishedProjectStating},true);sessionStorage.setItem("selectedPublishedProjectId",""+project.id);}}>
            <img src={project.thumbnail} alt={project.title} className="published-project-image" /> {/* 画像を表示 */}
            <span className="published-title">{project.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublishedProjectList;
