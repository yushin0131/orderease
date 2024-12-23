

import React from 'react'
import Product from '../product-tool/Product'

type Props = {
    product: Product,
}

const Template1 = (props: Props) => {
    const { id, name, price, thumbnail } = props.product;

    return (
        <>
            <div className='product' style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr", // 画像は自動で幅を調整、テキストは残りの幅を占める
                gap: "20px", // 要素間の隙間
                width: "100%",
                padding: "5vh", // スペースをビューポートの高さに基づいて調整
                boxSizing: "border-box",
                fontSize: "calc(1vw + 1vh + 1em)", // スマホ画面でも少し大きくなるように調整
                maxWidth: "100%",
            }}>
                <img 
                    src={thumbnail} 
                    style={{
                        width: "auto", // 画像の幅を自動調整
                        height: "auto", // 高さを自動調整
                        maxWidth: "25vw", // 画像の最大幅をビューポートの幅に基づいて制限
                        maxHeight: "25vh", // 画像の最大高さをビューポートの高さに基づいて制限
                        objectFit: "contain", // 縦横比を保ちつつ親要素に合わせる
                        transition: "all 0.3s ease", // アニメーションを追加して、拡大時の動きをスムーズに
                    }} 
                />
                <div style={{
                    display: "grid",
                    gridTemplateRows: "auto auto auto",
                    justifyContent: "center",
                    fontSize: "calc(1.5vw + 2vh)", // フォントサイズをスマホでも大きくなるように調整
                    textAlign: "center",
                    lineHeight: "1.5", // テキスト間の余白を調整
                    minWidth: "20vw", // テキスト部分が小さすぎないように最小幅を設定
                }}>
                    <div>{name}</div>
                    <div>{price}</div>
                </div>
                <span style={{ display: "none" }}>
                    <input name="product-id" value={id} />
                    <input name="product-name" value={name} />
                    <input name="product-price" value={price} />
                </span>
            </div>
        </>
    )
}

export default Template1


