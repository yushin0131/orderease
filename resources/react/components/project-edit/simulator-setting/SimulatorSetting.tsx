import React from 'react'

type Props = {
    direction: "horizontal" | "vertical",
    setDirection: React.Dispatch<React.SetStateAction<"horizontal" | "vertical">>,
}

const SimulatorSetting = ({direction,setDirection}: Props) => {
    return (
        <div>
            <button onClick={()=>setDirection(direction=="horizontal"?"vertical":"horizontal")}>{direction=="horizontal"?"要素選択中":"行選択中"}</button>
        </div>
    )
}

export default SimulatorSetting