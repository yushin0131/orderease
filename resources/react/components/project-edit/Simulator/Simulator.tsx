import React, { useRef } from 'react'
import "./Simulator.css"
import Form from './test/Form'
import Row from '../Row';
import { Color } from '@mui/material';
type Props = {
    formRef:React.RefObject<HTMLDivElement>,
    rows: Row[],
    setRows:React.Dispatch<React.SetStateAction<Row[]>>,
    formLog:Row[][],
    setFormLog:React.Dispatch<React.SetStateAction<Row[][]>>,
    formBackLog:Row[][],
    setFormBackLog:React.Dispatch<React.SetStateAction<Row[][]>>,
    direction: "horizontal" | "vertical",
    setDirection: React.Dispatch<React.SetStateAction<"horizontal" | "vertical">>,
    color:string,
}

const Simulator = (props: Props) => {
    return (
        <div className="simulator" onDragOver={e=>e.preventDefault()}>
            <Form {...props} />
        </div>
    )
}

export default Simulator

