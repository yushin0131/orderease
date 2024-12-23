import { createRoot } from 'react-dom/client';
import React, { useEffect } from 'react';
import VisitorApp from './VisitorApp';
const root = createRoot(document.getElementById('root')!);

const Index=()=>{
    const clearPreRender=()=>{
        const preRender=document.getElementById("pre-render");
        preRender?.remove();
        return <></>
    }
    return <><VisitorApp/>{clearPreRender()}</>
}

root.render(<React.StrictMode><Index/></React.StrictMode>);