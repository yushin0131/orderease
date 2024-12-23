import { createRoot } from 'react-dom/client';
import App from './components/App';
import React, { useEffect } from 'react';
const root = createRoot(document.getElementById('root')!);

const Index=()=>{
    const clearPreRender=()=>{
        const preRender=document.getElementById("pre-render");
        preRender?.remove();
        return <></>
    }
    return <><App/>{clearPreRender()}</>
}

root.render(<React.StrictMode><Index/></React.StrictMode>);