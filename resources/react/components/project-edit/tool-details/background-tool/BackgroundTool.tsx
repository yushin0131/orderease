import React, { useState } from 'react'
import { SketchPicker } from 'react-color';

type Props = {
    color:string,
    setColor:React.Dispatch<React.SetStateAction<string>>
}

const BackgroundTool = (props: Props) => {
    

    const handleChange = (color: any) => {
      props.setColor(color.hex);
    };
  
    return (
      <div>
        <SketchPicker color={props.color} onChange={handleChange} />
        <p>選択された色: {props.color}</p>
      </div>
    );
}

export default BackgroundTool