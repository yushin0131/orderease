import React from 'react'
import "./Tool.css";
type Props = {
  name:string,
  isSelected:boolean,
  changeToolMode:()=>void,
}

const Tool = (props: Props) => {
  return (
    <span className="tool" style={{backgroundColor:props.isSelected?"red":""}} onClick={props.changeToolMode}>
        {props.name}
    </span>
  )
}

export default Tool