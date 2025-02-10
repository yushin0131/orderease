import React, { useEffect } from 'react'
import { useShared } from '../useShared'

type Props = {}

const Init = (props: Props) => {
    const {setMode,ORDER,setFooterValue} = useShared.states();
    useEffect(()=>{
      setTimeout(()=>{
        setFooterValue(0)
        setMode(ORDER)
      },3000)
    })
  return (
    <div></div>
  )
}

export default Init