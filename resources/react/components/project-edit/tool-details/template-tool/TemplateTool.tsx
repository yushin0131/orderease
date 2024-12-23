import React from 'react'
import Template1 from './Template1'
import Product from '../product-tool/Product'
import TemplateToolDetails from './template-tool-details/TemplateToolDetails'
import Row from '../../Row'

type Props = {
    products:Product[],
    formLog: Row[][],
  setFormLog: React.Dispatch<React.SetStateAction<Row[][]>>,
  setFormBackLog: React.Dispatch<React.SetStateAction<Row[][]>>,
  rows: Row[],
  setRows: React.Dispatch<React.SetStateAction<Row[]>>,
}

const TemplateTool = (props: Props) => {
    const product:Product={
        id:1,
        name:"プリン",
        price:1000,
        thumbnail:"https://iconbu.com/wp-content/uploads/2020/11/%E3%81%B7%E3%82%8B%E3%81%B7%E3%82%8B%E3%83%97%E3%83%AA%E3%83%B3.jpg",
    }
  return (
    <div>
        {/* <div style={{height:"15vh"}}>
        <Template1 product={product}/>
        </div> */}
        <TemplateToolDetails {...props}/>
    </div>
  )
}

export default TemplateTool