import React, { useEffect, useState } from 'react';
import './StoreOrderLog.css';
import axios from 'axios';

const StoreOrderLog = () => {

    const [orders, setOrders] = useState<{id:number,seat:string,name:string,quantity:number}[]>([]);

    useEffect(()=>{
        axios.post("/api/orderget",{
            projectId:sessionStorage.getItem("selectedPublishedProjectId"),
        }).then(res=>{
            const anyOrders=res.data as any[];
            const tmpOrders=anyOrders.map(order=>{
                return {
                    id:order.id,
                    seat:order.seat_number,
                    name:order.product_name,
                    quantity:order.quantity,

                }
            })
            setOrders(tmpOrders);
        })
    },[])

    //ここで削除
    const handleRemove = (id: number) => {
        axios.post("/api/orderremove",{orderId:id}).then(res=>{
            console.log(res.data);
        })
        setOrders(orders.filter(order => order.id !== id));
    }
    
    
    return (
        <div className="order-log-container"> 
        <div>注文一覧</div>
            <div className="order-log-list">
                {orders.map(order => (
                    <div className="order-log-item" key={order.id} onClick={() => handleRemove(order.id)}>
                        <div className="order-log-details">
                            <div className="order-seat">席: {order.seat}</div>
                            <span className="order-name">{order.name}</span>
                            <div className="order-quantity">数量: {order.quantity}</div>
                        </div>
                    </div>    
                ))}
            </div>
        </div>
    );
};

export default StoreOrderLog;