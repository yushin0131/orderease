import React, { useState } from 'react'
import "./SharpText.css"
type Props = {
  itemClickEventHandler: (item: HTMLElement) => void,
}

const SharpText = (props: Props) => {
  const dragStart = (e: React.DragEvent<HTMLSpanElement>) => {
    e.dataTransfer.setData('text/plain', e.currentTarget.innerHTML);
  }
  return (
    <span onDragStart={dragStart} draggable="false" className="item" onClick={(e) => props.itemClickEventHandler(e.currentTarget)}>
      <span>
        <button>aiueo</button>
        SharpText
      </span>
    </span>
  )
}

export default SharpText