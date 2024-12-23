import React from 'react'
import "./TreeView.css"
import Row from '../Row'
type Props = {
    rows: Row[],
    formRef: React.RefObject<HTMLDivElement>,
}

const TreeView = (props: Props) => {
    return (
        <div className="treeView">
            {props.rows.map((row, i) => {
                return <div>

                    {i}行:
                    {row.map((element,j)=>{
                        return <span>{j}番目:{element.element}</span>
                    })}

                </div>
            })}
        </div>
    )
}

export default TreeView