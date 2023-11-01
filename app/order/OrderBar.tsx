import { Avatar, Box, Button, Card, Container, Grid, IconButton, Paper } from "@mui/material";
import { drinks } from "@prisma/client";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import React from "react";

interface CartItemCounterProps {
    order: drinks[],
}

const CartItemCounter: React.FC<CartItemCounterProps> = ({order}) => {
    return (
        <>{order.length}</>
    );
}

interface CartProps {
    order: drinks[],
    clearOrder(): void,
}

const Cart: React.FC<CartProps> = ({order}) => {
    return (
        <Box sx={{justifyContent: 'flex-end', alignContent: 'center'}}>
            <CartItemCounter order={order}/>
            <IconButton onClick={() => {}} sx={{ p: 0 }}>
                <Avatar>
                    <ShoppingBasketIcon fontSize="large"/>
                </Avatar>    
            </IconButton>

        </Box>
    );  
}

interface OrderBarProps {
    order: drinks[],
    clearOrder(): void,
    finishOrder(): void,
}

const OrderBar: React.FC<OrderBarProps> = ({order, clearOrder, finishOrder}) => {
    return (
        <Paper sx={{display: "flex", width: '100%', height: '5rem', background: '#9F9F9F', alignContent: 'center', justifyContent: 'flex-end'}}>
            <Button onClick={finishOrder}>Finish Order</Button>
            <Button onClick={clearOrder}>Clear Order</Button>
            <Cart order={order} clearOrder={clearOrder}/>
        </Paper>
    );
}

export default OrderBar;
