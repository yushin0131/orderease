import React, { useRef, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import Product from './Product';
import "./ProductTool.css"
import { uploadImage } from '../../../../firebase/firebase';

type Props = {
    products: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
}

const ProductTool = (props: Props) => {
    const [isAddProduct, setIsAddProduct] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);

    const [thumbnail,setThumbnail]=useState<string|null>(null);

    const productRegister = () => {
        if(!nameRef.current||!thumbnail||!priceRef.current)return;
        const id = -1;
        const name = nameRef.current.value;
        const price = Number(priceRef.current.value);
        const product: Product = {
            id, name, thumbnail, price,
        };

        // この商品データをapiに送信し、データベースに登録。
        // idを返してもらう

        console.log(product);

        props.setProducts(prev => {
            const newProducts = [...prev];
            newProducts.push(product);
            return newProducts;
        });

        setIsAddProduct(false);
    }

    const onChangeThumbnail=async(event: React.ChangeEvent<HTMLInputElement>) => {
        const file=event.target.files?.[0];
    
        if (file) {
          const url = await uploadImage(file);
          setThumbnail(url?url:"");
        } else {
          console.error("No file selected for upload.");
        }
    }

    return (
        <div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {props.products.map(product => {
                    return <div style={{ width: "7vw", height: "7vw", border: "black 1px solid" }}>
                        <img src={product.thumbnail} title={`商品：${product.name}\n金額：${product.price}`} style={{width:"7vw"}} alt="ない" />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            {/* <div>{product.name.length > 5 ? `${product.name.substring(0, 5)}... ` : product.name}</div>
                            <div>{product.price}</div> */}
                        </div>
                    </div>
                })}
                <IoMdAdd size={"7vw"} className="productRegister" onClick={() => setIsAddProduct(true)} />
            </div>
            {isAddProduct && (
                <div onClick={event=>{
                    const target = event.target as HTMLElement;
                    if (target.classList.contains('tp-black-filter')) {
                      setIsAddProduct(false);
                    }
                }}>
                    <div className="tp-black-filter"/>
                    <div className='addProductToolForward'>
                        <div>商品名<input ref={nameRef}/></div>
                        <div>　　　　画像<input type="file" onChange={onChangeThumbnail} /></div>
                        <div>価格<input ref={priceRef}/></div>
                        <button onClick={productRegister}>登録</button>
                        {/* <button onClick={() => setIsAddProduct(false)}>キャンセル</button> */}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductTool