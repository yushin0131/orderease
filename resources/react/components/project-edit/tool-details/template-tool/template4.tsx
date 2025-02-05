

import React from 'react'
import Product from '../product-tool/Product'

type Props = {
    product: Product,
}

const Template4 = (props: Props) => {
    const { id, name, price, thumbnail } = props.product;

    return (
        <>
            <div className="product" style={{ display: 'flex', alignItems: 'center', textAlign: 'center',border:"solid 1px black",borderRadius:"10px"}}>
                <img src={thumbnail} style={{ width: "auto", height: "100%", maxHeight: "15vh", margin: "0" }} />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '0px' }}>
                    <div>{name}</div>
                    <div>{price}</div>
                </div>
                <div style={{ display: "grid", gridTemplateRows: "0fr 1fr 1fr 0fr", marginTop: "10%" }}>
                </div>
                <span style={{ display: "none" }}>
                    <input name='product-id' value={id} />
                    <input name='product-name' value={name} />
                    <input name='product-price' value={price} />
                </span>
            </div>
        </>
    )
}

export default Template4


