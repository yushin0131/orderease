import React, { useState } from 'react'
import './Cart.css'
import { useShared } from '../useShared';
import axios from 'axios';

interface ProductInformation {
    id: number;         // 商品のユニークID
    name: string;       // 商品名
    quantity: number;   // 商品の個数
    price: number;      // 商品の価格
}

interface CartProps {
    cart: ProductInformation[]
    setCart: React.Dispatch<React.SetStateAction<ProductInformation[]>>
    orders: ProductInformation[]
    setOrders: React.Dispatch<React.SetStateAction<ProductInformation[]>>
    projectId:string,
    seatId:string,
}

const Cart: React.FC<CartProps> = ({ cart, setCart, orders, setOrders ,projectId,seatId}) => {
    const { setMode, setFooterValue, ORDER, CART, CHECKOUT, ORDER_LOG } = useShared.states();

    // カート内の合計金額を計算
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.quantity * item.price, 0);
    }

    // 数量を増加
    const handleIncrement = (id: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };
    // 数量を減少
    const handleDecrement = (id:number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
            )
        );
    };

    const handleConfirmOrder = () => {
        alert('注文が確定しました！');
        cart.forEach(product=>{
            axios.post("/api/orderadd",{
                projectId,seatId,
                productName:product.name,
                quantity:product.quantity,
                price:product.price,
            }).then(res=>{
                console.log(res.data);
            })
        })
        setOrders((prevOrders) => [...prevOrders, ...cart]);
        setCart([]); // カートを空にする
        setMode(ORDER);
        setFooterValue(0);
        console.log("注文",orders);



    }

    return (
        <div className="cart-container">
            <div className="cart-order-list">
                {cart.map((item) => (
                    <div className="order-item" key={item.id}>
                        <div className="order-details">
                            <span>{item.name}</span>
                            <div className="order-price">¥{item.price}</div>
                            <div className="order-total">合計: ¥{item.quantity * item.price}</div>
                        </div>
                        <div className="quantity-controls">
                            <button onClick={() => handleDecrement(item.id)} disabled={item.quantity <= 0}>-</button>
                            <span className="quantity">{item.quantity}</span>
                            <button onClick={() => handleIncrement(item.id)}>+</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="order-summary">
                <div className="total-amount">合計金額: ¥{calculateTotal()}</div>
                <button className="confirm-order-button" onClick={handleConfirmOrder}>
                    注文を確定する
                </button>
            </div>
        </div>
    )
}

export default Cart;
