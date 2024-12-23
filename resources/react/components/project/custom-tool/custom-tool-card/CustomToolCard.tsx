import React, { useRef, useState } from 'react'
import "./CustomToolCard.css"
import { useShared } from '../../../useShared';

type CustomToolCardProps = {
  id: string;
  title: string;
  thumbnail: string;
}

const CustomToolCard = (props: CustomToolCardProps) => {
  const cardRef = useRef<HTMLSpanElement>(null);
  const {setShared,isExtensionToolEditing} = useShared.states();
  return (
    <span ref={cardRef} onClick={()=>setShared({isExtensionToolEditing},true)}>
      <span className="extensionToolCard">
        <img src={props.thumbnail} />
        <span className='card-title'>{props.title}</span>
      </span>
    </span>
  )
}

export { CustomToolCard, type CustomToolCardProps }