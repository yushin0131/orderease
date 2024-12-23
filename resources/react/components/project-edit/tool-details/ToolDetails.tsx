import React, { useEffect, useRef, useState } from 'react'
import "./ToolDetails.css"
import { Mode, Render } from '../../../lib/MegaMegaHooks';
type Props = {
    toolMode:Mode,
}

const ToolDetails = (props: Props) => {
    const toolDetailsRef = useRef<HTMLDivElement>(null);
    const [toolDetailsHeight, setToolDetailsHeight] = useState<number>(0);

    useEffect(() => {
        const calculateHeight = () => {
            if (toolDetailsRef.current) {
                const windowHeight = window.innerHeight; // 100vh に相当
                const childCurrentHeight = toolDetailsRef.current.offsetTop; // 現在の子要素の高さ
                const calculatedHeight = windowHeight - childCurrentHeight;
                setToolDetailsHeight(calculatedHeight);
            }
        };

        calculateHeight();

        window.onresize=calculateHeight;
        return () => {
            window.onresize=null;
        };
    }, []);
    return (
        <div onDragOver={e=>e.preventDefault()} className="toolDetails" ref={toolDetailsRef} style={{height:`${toolDetailsHeight-10}px`}}>
            <Render mode={props.toolMode}/>
        </div>
    )
}

export default ToolDetails