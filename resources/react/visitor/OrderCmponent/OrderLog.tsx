import React from 'react';
import './OrderLog.css'; // スタイルをインポート

interface Order {
    id: number;         // 商品のユニークID
    name: string;       // 商品名
    quantity: number;   // 商品の個数
    price: number;      // 商品の価格
}

interface OrderLogProps {
    orders: Order[];    // 親コンポーネントから受け取る商品データ
}

const OrderLog: React.FC<OrderLogProps> = ({ orders }) => {

    const calculateTotal = () => {
        return orders.reduce((total, order) => total + order.quantity * order.price, 0);
    }

    return (
        <div className="order-log-container"> {/* コンテナのスタイルを変更 */}
            {/* <div className="order-log-header">
                <h2>注文履歴</h2>
            </div> */}
            <div className="order-log-list">
                {orders.map((order) => (
                    <div className="order-log-item" key={order.id}>
                        <div className="order-log-details">
                            <span className="order-name">{order.name}</span>
                            <div className="order-price">¥{order.price}</div>
                            <div className="order-total">合計: ¥{order.quantity * order.price}</div>
                            <div className="order-quantity">数量: {order.quantity}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="order-log-summary">
                <div className="total-log-amount">合計金額: ¥{calculateTotal()}</div>
            </div>
        </div>
    );
};

export default OrderLog;
