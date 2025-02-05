import React from 'react';
import { useShared } from '../useShared';
import './Checkout.css'; 

interface ProductInformation {
    id: number;        
    name: string;       
    quantity: number;  
    price: number;
  }

interface CheckoutProps {
    orders: ProductInformation[]
    setOrders: React.Dispatch<React.SetStateAction<ProductInformation[]>>
}

const Checkout: React.FC<CheckoutProps> = ({ orders, setOrders }) => {
    const { setMode, setFooterValue, ORDER, CART, CHECKOUT, ORDER_LOG } = useShared.states();

    const calculateTotal = () => {
        return orders.reduce((total, order) => total + order.quantity * order.price, 0);
    }

    // const handlecheckout = () => {
    //     setOrders([]);
    //     setMode(ORDER);
    //     setFooterValue(0);
    //     alert("会計が終了しました");
    // }

    return (
        <div className="checkout-container"> {/* コンテナのスタイルを変更 */}
            <div className="checkout-order-log-list">
                {orders.map((order) => (
                    <div className="checkout-order-item" key={order.id}>
                        <div className="checkout-order-details">
                            <span className="order-name">{order.name}</span>
                            <div className="order-price">¥{order.price}</div>
                            <div className="order-total">合計: ¥{order.quantity * order.price}</div>
                            <div className="order-quantity">数量: {order.quantity}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="confirmation">
                        会計内容をご確認のうえ、<br/>
                        レジでこちらの画面をご提示ください。
            </div>
            <div className="checkout-order-summary">
                <div className="checkout-total-amount">合計金額: ¥{calculateTotal()}</div>
                {/* <button className="checkout-button" onClick={handlecheckout}>
                    会計を終了
                </button> */}
            </div>
        </div>
    );
};

export default Checkout;
