import React from 'react'
import { Mode } from '../MegaMegaHooks';

type Props = {
    mode:Mode,
}

const Render = (props: Props) => {
  return props.mode.modeMap[props.mode.id];
}

export {Render as __________DEPRECATED_RENDER__________}