import React from 'react'
import "./ImageDetails.css"
import Row from '../../../Row'
import { uuid } from '../../../../../lib/MegaMegaHooks'
type Props = {
    image: string,
    formLog: Row[][],
    setFormLog: React.Dispatch<React.SetStateAction<Row[][]>>,
    setFormBackLog: React.Dispatch<React.SetStateAction<Row[][]>>,
    rows: Row[],
    setRows: React.Dispatch<React.SetStateAction<Row[]>>,
}

const ImageDetails = ({ image, formLog, setFormLog, setFormBackLog, rows, setRows }: Props) => {
    // クリックされた要素をクローン(クリック時の処理も含める)して、貼り付けるサンプルコード
    const itemClickEventHandler = (item: HTMLElement) => {
        setFormLog([...formLog, rows])
        setFormBackLog([])
        const newRows = [...rows];
        newRows.push([{ id: uuid(), element: item.outerHTML, rowIndex: newRows.length }]);
        setRows(newRows)
    }
    return (
        <div style={{height:"7vw",border:"1px black solid"}}><img className="imageDetails" src={image} onClick={e => itemClickEventHandler(e.currentTarget)} draggable="false" /></div>
    )
}

export default ImageDetails