import React from 'react'
import SharpText from './text-details/SharpText'
import SharpText2 from './text-details/SharpText2'
import { uuid } from '../../../../lib/MegaMegaHooks';
import Row from '../../Row';

type Props = {
  formLog: Row[][],
  setFormLog: React.Dispatch<React.SetStateAction<Row[][]>>,
  setFormBackLog: React.Dispatch<React.SetStateAction<Row[][]>>,
  rows: Row[],
  setRows: React.Dispatch<React.SetStateAction<Row[]>>,
}

const TextTool = (props: Props) => {

  // クリックされた要素をクローン(クリック時の処理も含める)して、貼り付けるサンプルコード
  const itemClickEventHandler = (item: HTMLElement) => {
    props.setFormLog([...props.formLog,props.rows])
    props.setFormBackLog([])
    const newRows=[...props.rows];
    newRows.push([{id:uuid(),element:item.outerHTML,rowIndex:newRows.length}]);
    props.setRows(newRows)
  }

  return (
    <div>
      <SharpText itemClickEventHandler={itemClickEventHandler} />
      <SharpText2 itemClickEventHandler={itemClickEventHandler} />
    </div>
  )
}

export default TextTool