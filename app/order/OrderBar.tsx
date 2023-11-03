import { Avatar, Box, Button, Card, Container, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Stack, Typography } from "@mui/material";
import { drinks } from "@prisma/client";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import React, { useState } from "react";

interface CartDisplayProps {
    isOpen: boolean,
    toggleCart(): void,
    removeItem(index: number): void,
    cartItems: drinks[],
}

const CartDisplay: React.FC<CartDisplayProps> = ({ isOpen, toggleCart, cartItems, removeItem }) => {
    return (
        <>
        <IconButton style={{}} onClick={toggleCart}>
            <Avatar>
                <ShoppingBasketIcon fontSize="large"/>
            </Avatar>
        </IconButton>

        <Drawer anchor="right" open={isOpen} onClose={toggleCart}>
            <div style={{ width: '250px' }}>
                <List>
                    {cartItems.map((item, index) => (
                        <ListItemButton>
                            <ListItem key={index} onClick={() => (removeItem(index))}>
                                <ListItemText primary={item.drink_name} secondary={`Price: ${"$" + item.unit_price}`} />
                            </ListItem>
                        </ListItemButton>
                    ))}
                </List>
            </div>
        </Drawer>
      </>
    );
  };

interface CartProps {
    order: drinks[],
    clearOrder(): void,
    removeItem(index: number): void,
}

const Cart: React.FC<CartProps> = ({order, removeItem}) => {
    const [cartOpen, setCartOpen] = useState(false);

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };


    return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight:'1rem' }}>
            <>{order.length}</>
            <CartDisplay isOpen={cartOpen} toggleCart={toggleCart} cartItems={order} removeItem={removeItem}/>
        </Box>
    );  
}

interface PriceDisplayProps {
    total_price: Number
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({total_price}) => {
    return (
        <Typography variant="h4">
            {"$" + total_price}
        </Typography>
    )
}

interface OrderBarProps {
    order: drinks[],
    clearOrder(): void,
    finishOrder(): void,
    back(): void,
    removeItem(index: number): void,
}

const OrderBar: React.FC<OrderBarProps> = ({order, clearOrder, finishOrder, back, removeItem}) => {
    const total_price = order.length !== 0 && order !== null ? order.map((item) => item.unit_price).reduce((acc, curr) => acc! + curr!)! : 0.00;

    return (
        <Paper sx={{display: "static", marginTop:'0', width: '100%', height: '5rem', background: '#9F9F9F'}}>
            <Grid container spacing={{}} columns={{ xs: 12, sm: 12, md: 12 }} sx={{height: '100%'}}>
                <Grid item xs={4} sm={4} md={4} sx={{display: 'flex', alignItems: 'center'}}>
                    <Button onClick={finishOrder}>Finish Order</Button>
                    <Button onClick={back}>Back</Button>
                </Grid>
                <Grid item xs={4} sm={4} md={4} sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <PriceDisplay total_price={total_price}/>
                </Grid>
                <Grid item xs={4} sm={4} md={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Cart order={order} clearOrder={clearOrder} removeItem={removeItem}/>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default OrderBar;
