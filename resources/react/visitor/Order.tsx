import React, { useState } from 'react'
import OrderProcess from './OrderCmponent/OrderProcess'
import { useShared } from './useShared';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Cart from './OrderCmponent/Cart';
import "./Order.css"
import OrderLog from './OrderCmponent/OrderLog';
import Checkout from './OrderCmponent/Checkout';
import Init from './OrderCmponent/Init';
import { Render, useMode, useRender } from '../lib/MegaMegaHooks';

interface ProductInformation {
  id: number;
  name: string;
  quantity: number;
  price: number;
}
type Props ={
  formHtml:string,
  backgroundColor:string,
  projectId:string,
  seatId:string,
}
const Order = ({formHtml,backgroundColor,projectId,seatId}:Props) => {

  const [footerValue, setFooterValue] = React.useState(-1);

  const footerHandleChange = (event: React.SyntheticEvent, newValue: number) => {
    setFooterValue(newValue);

    switch (newValue) {
      case 0: // メニューのタブ
        handleMenu();
        break;
      case 1: // カートのタブ
        handleCart();
        break;
      case 2: // 注文履歴のタブ
        handleOrderLog();
        break;
      case 3: // 会計のタブ
        handlePaymentClick();
        break;
      default:
        break;
    }
  };

  const handleMenu = () => {
    console.log("メニュー");
    setMode(ORDER);
  };
  const handleCart = () => {
    console.log("カート");
    setMode(CART);
  };
  const handleOrderLog = () => {
    console.log("注文履歴");
    setMode(ORDER_LOG);
  };
  const handlePaymentClick = () => {
    console.log("会計");
    setMode(CHECKOUT);
  };

  const getTabLabel = () => {
    switch (footerValue) {
      case 0:
        return "メニュー";
      case 1:
        return "カート";
      case 2:
        return "注文履歴";
      case 3:
        return "会計";
    }
  }

  const tabs = formHtml.split("#####split-target#####");

  const [cart, setCart] = useState<ProductInformation[]>([]);
  const [orders, setOrders] = useState<ProductInformation[]>([]);

  // 使用例

  // モードを3つ用意
  const [INIT,ORDER, CART, CHECKOUT, ORDER_LOG] = useMode(5);

  // 初期時のモードと、モードごとに対応するHTML要素を設定
  const [mode, setMode] = useRender(INIT, {
    [INIT]:<Init />,
    [ORDER]: <OrderProcess setCart={setCart} tabs={tabs} />,
    [CART]: <Cart cart={cart} setCart={setCart} orders={orders} setOrders={setOrders} projectId={projectId} seatId={seatId}/>,
    [ORDER_LOG]: <OrderLog orders={orders} />,
    [CHECKOUT]: <Checkout orders={orders} setOrders={setOrders} />,
  });

  useShared.init({
    setMode, setFooterValue, ORDER, CART, CHECKOUT, ORDER_LOG, tabs,
  })

  // 現在のモードに対応するHTML要素を取得
  // <Render mode={ mode }/>

  // モードを更新
  // setMode(MODE2);

  //カートのイベントリスナー
  const cartButton = document.querySelector(".cart-button");
  cartButton?.addEventListener("click", () => {
    handleCart();
  })

  //会計のイベントリスナー
  const paymentButton = document.querySelector(".payment-button");
  paymentButton?.addEventListener("click", () => {
    handlePaymentClick();
  })

  return (
    <div className="orderWrapper" style={{overflowX:"hidden",backgroundColor:backgroundColor}}>
      <div className="tab-name" style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5" component="div">
          {getTabLabel()}
        </Typography>
        <div className='seat-number'>席番号:{seatId}</div>
      </div>
      <Divider />
      <Render mode={mode} />
      <Divider />
      <Tabs
        className="footer-tab"
        value={footerValue}
        onChange={footerHandleChange}
        variant="fullWidth"
        style={{width:"100vw"}}
      >
        <Tab label="メニュー" />
        <Tab label="カート" />
        <Tab label="注文履歴" />
        <Tab label="会計" />
      </Tabs>
    </div>
  )
}

export default Order