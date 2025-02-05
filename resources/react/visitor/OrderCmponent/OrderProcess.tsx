import React, { useEffect, useState } from 'react'
import './OrderProcess.css';
import { useShared } from '../useShared';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Divider from '@mui/material/Divider';
import { TransitionProps } from '@mui/material/transitions';
import { ListItem, TextField } from '@mui/material';

import { IoClose } from "react-icons/io5";

interface ProductInformation {
  id: number;        
  name: string;       
  quantity: number;  
  price: number;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type OrderProcessProps = {
  setCart: React.Dispatch<React.SetStateAction<ProductInformation[]>>,
  tabs: string[],
}

const OrderProcess: React.FC<OrderProcessProps> = ({ setCart, tabs }) => {
  const { setMode, ORDER, CART, CHECKOUT, ORDER_LOG } = useShared.states();

  const tabNames = tabs.map(tab => {
    const nameStartMark = "#####tabNameStart#####"
    const nameFinishMark = "#####tabNameFinish#####"
    const startIndex = tab.indexOf(nameStartMark) + nameStartMark.length;
    const finishIndex = tab.indexOf(nameFinishMark);
    return tab.substring(startIndex, finishIndex).trim();
  })

  const tabContent = tabs.map((tab, i) => {
    const nameStartMark = "#####tabNameStart#####"
    const nameFinishMark = "#####tabNameFinish#####"
    const startIndex = tab.indexOf(nameStartMark)
    const finishIndex = tab.indexOf(nameFinishMark) + nameFinishMark.length;
    return {
      id: i, content: tab.replace(tab.substring(startIndex, finishIndex), "")
    }
  })

  const handleOrderClick = (productDetails: ProductInformation) => {
    setCart(prevCart => [...prevCart, productDetails]);
  }

  const [headerValue, setHeaderValue] = React.useState(0);
  const headerHandleChange = (event: React.SyntheticEvent, newValue: number) => {
    setHeaderValue(newValue);
  };

  useEffect(() => {
    attachEventListeners();
  }, [headerValue])


  const [open, setOpen] = React.useState(false);

  const [productDetails, setProductDetails] = useState<ProductInformation>({
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
  })

  const handleClickOpen = (id: number, name: string, price: number) => {
    setProductDetails({ id, name, price, quantity: 1 });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleIncrement = () => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      quantity: prevDetails.quantity + 1,
    }));
  };

  const handleDecrement = () => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      quantity: Math.max(0, prevDetails.quantity - 1),
    }));
  };

  //ボタンイベントの設定
  const attachEventListeners = () => {
    const products = document.querySelectorAll('.product');
    products.forEach((product) => {
      product.addEventListener('click', () => {
        const id = parseInt((product.querySelector("input[name='product-id']") as HTMLInputElement)?.value || '');
        const name = (product.querySelector("input[name='product-name']") as HTMLInputElement)?.value || '';
        const price = parseInt((product.querySelector("input[name='product-price']") as HTMLInputElement)?.value || '');
        handleClickOpen(id, name, price);
      })
    })
    return <></>
  }

  const addCart = () => {
    handleOrderClick({
      quantity: productDetails.quantity,
      id: productDetails.id,
      name: productDetails.name,
      price: productDetails.price,
    })
    setOpen(false);
    // console.log(productDetails);
  }

  const canAddToCart = productDetails.quantity > 0;

  return (
    <div className='orderProcessWrapper'>
      <Tabs
        className='headerTabs'
        value={headerValue}
        onChange={headerHandleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabNames.map(tabName=>(
          <Tab label={tabName}/>
        ))}
      </Tabs>
      <Divider />
      <div
        dangerouslySetInnerHTML={{ __html: tabContent.find((tab) => tab.id === headerValue)?.content || "" }}
      />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            sx={{ marginLeft: 'auto' }}
          >
            <IoClose />
          </IconButton>
          <Typography sx={{ flex: 1, marginLeft: 2, marginBottom: 2 }} variant="h6" component="div">
            {productDetails.name}
          </Typography>

        </AppBar>
        <List>
          <ListItem>
            <Typography>商品名:{productDetails.name}</Typography>
          </ListItem>
          <ListItem>
            <Typography>価格:{productDetails.price}円</Typography>
          </ListItem>
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center', 
            gap: 1 , 
            marginLeft: 2,
            }}>
            <Button
              variant="outlined"
              onClick={handleDecrement}
              sx={{
                borderRadius: '50%',
                width: 40,
                height: 40,
                minWidth: 0,
                fontSize: 15,
              }}
              disabled={!canAddToCart}
            >
              -
            </Button>
            <TextField
              type="number"
              value={productDetails.quantity}
              variant="standard"
              sx={{
                width: '40px',
                textAlign: 'center',
                '& input[type=number]::-webkit-inner-spin-button': { display: 'none' }, // 邪魔な矢印消すやつ
                '& input[type=number]::-webkit-outer-spin-button': { display: 'none' },
                '& .MuiInput-underline:before': { borderBottom: '1px solid #000' },
                '& .MuiInput-underline:hover:before': { borderBottom: '1px solid #000' },
                '& .MuiInput-underline:after': { borderBottom: '1px solid #000' },
              }}
            />
            <Button
              variant="outlined"
              onClick={handleIncrement}
              sx={{
                borderRadius: '50%',
                width: 40,
                height: 40,
                minWidth: 0,
                fontSize: 15,
              }}
            >
              +
            </Button>
          </Box>
          <ListItem>
            <TextField
              label="備考"
              variant='outlined'
              fullWidth
              multiline
              rows={4}
              sx={{marginTop: 2, marginX: 5}}
            />
          </ListItem>
          <Box 
            display="flex"
            justifyContent="center"
            marginTop={5}
          >
            <Button
              variant="contained"
              className="order-button"
              data-product={productDetails.name}
              onClick={addCart}
              disabled={!canAddToCart}
            >
              カートに追加
            </Button>
          </Box>
        </List>
      </Dialog>
    </div>
  )
}

export default OrderProcess