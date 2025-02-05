import React, { MouseEvent } from 'react'
import "./ToolBar.css"
import Tool from './tool/Tool'
import { Mode } from '../../../lib/MegaMegaHooks'
import { FaImages } from "react-icons/fa";
import { IoTextOutline } from "react-icons/io5";
import { SiFoodpanda } from "react-icons/si";
import { FaProductHunt } from "react-icons/fa";
import BackgroundTool from '../tool-details/background-tool/BackgroundTool';
import { PiSelectionBackground } from "react-icons/pi";
import { MdLibraryAdd } from "react-icons/md";

type Props = {
    toolMode: Mode,
    setToolMode: React.Dispatch<React.SetStateAction<symbol>>,
    modes: { [key: string]: symbol },
}

const ToolBar = (props: Props) => {

    const toolMap: { [key: string]: JSX.Element } = {
        IMAGE_TOOL: <FaImages size={"100%"} onClick={() => props.setToolMode(props.modes["IMAGE_TOOL"])} />,
        TEXT_TOOL: <IoTextOutline size={"100%"} onClick={() => props.setToolMode(props.modes["TEXT_TOOL"])} />,
        PRODUCT_TOOL:<MdLibraryAdd size={"100%"} onClick={()=>props.setToolMode(props.modes["PRODUCT_TOOL"])}/>,
        TEMPLATE_TOOL:<FaProductHunt size={"100%"} onClick={()=>props.setToolMode(props.modes["TEMPLATE_TOOL"])}/>,
        BACKGROUND_TOOL:<PiSelectionBackground size={"100%"} onClick={()=>props.setToolMode(props.modes["BACKGROUND_TOOL"])}/>, 
    }

    const paintTools = () => {
        
        return Object.keys(props.modes).map((key, i) => {
            return <span className={`tool${props.toolMode.id==props.modes[key]?" selectedTool":""}`}>{toolMap[key]}</span>
        })
    }

    return (
        <div>
            <div className="toolBar">
                {paintTools()}
            </div>
            <hr />
        </div>
    )
}

export default ToolBar