import React, { useRef, useState } from 'react'
import "./NewProject.css";
import { dividerClasses } from '@mui/material';
import sessionAuth from '../../../../session-auth/sessionAuth';
import { Project, useShared } from '../../../useShared';
import axios from 'axios';
import { uploadImage } from '../../../../firebase/firebase';
type Props = {
    setIsCreatingNewProject:React.Dispatch<React.SetStateAction<boolean>>,
}

const NewProject = (props: Props) => {
    const projectTitleRef = useRef<HTMLInputElement>(null);
    const [projectThumbnail, setProjectThumbnail] = useState<string | null>(null);
    const {setShared,user,isProjectEditing,editingProject}=useShared.states();

    const handleProjectThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }
        if (!file.type.startsWith("image/")) {
            alert("画像ファイルを選択してください");
            return;
        }
        uploadImage(file).then(uri=>{
            if(uri){
                setProjectThumbnail(uri);
            }
        })
    }

    const handleOnCreate = () => {
        if (!projectTitleRef.current) return;
        const {sessionId,emailOrOriginUserId,authType}=sessionAuth();
        const projectData = {
            sessionId, emailOrOriginUserId, authType,
            title: projectTitleRef.current.value,
            thumbnail: projectThumbnail,
        }
        axios.post<{ isSessionValid: boolean, project: Project }>("/api/newprojectadd", projectData).then(res => {
            console.log(res.data);
            if (res.data.isSessionValid) {
                
                user?.projects.push(res.data.project)
                setShared({ isProjectEditing }, true);
                setShared({ editingProject }, res.data.project);
            }
        })
    }

    return (
        <div className="newProject">
            <div className="newProjectForward">
                <div style={{ textAlign: "center" }}>
                    <span>プロジェクト名：</span>
                    <input ref={projectTitleRef} style={{ width: "30vw" }} />
                </div>
                <label>
                    <input type="file" accept="image" onChange={handleProjectThumbnailChange} style={{ display: "none" }} />
                    {
                        projectThumbnail ?
                            <img style={{ width: "10vw", height: "10vw", backgroundColor: "gray", borderRadius: "10px" }} src={projectThumbnail ? projectThumbnail : ""} />
                            :
                            <div style={{ width: "10vw", height: "10vw", backgroundColor: "gray", borderRadius: "10px" }}>サムネイルを選択</div>
                    }
                </label>
                <div>
                    <button onClick={handleOnCreate}>作成</button>
                    <button onClick={()=>props.setIsCreatingNewProject(false)}>キャンセル</button>
                </div>
            </div>
        </div>
    )
}

export default NewProject