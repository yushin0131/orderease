import axios from 'axios';
import React, { useState } from 'react';

const CheckoutFin = () => {
const [inputSeat, setInputSeat] = useState('');

    const handleCheckOutFin = (e: any) => {
        const seatId=inputSeat;
        const projectId=sessionStorage.getItem("selectedPublishedProjectId");
        axios.post("/api/ordercheckout",{
            projectId,
            seatId,
        })
    }
    
    return (
        <div className="CheckOut-Fin"> 
            <input type="text" onChange={e=>setInputSeat(e.currentTarget.value)}/>
            <button onClick={handleCheckOutFin}>
                会計終了
            </button>
        </div>
    );
};

export default CheckoutFin;