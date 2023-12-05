import { Avatar, Box, Button, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { drinks } from "@prisma/client";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import React, { useState } from "react";

interface CartDisplayProps {
    isOpen: boolean,
    toggleCart(): void,
    removeItem(index: number): void,
    finishOrder(): void,
    cartItems: drinks[],
}

const CartDisplay: React.FC<CartDisplayProps> = ({ isOpen, toggleCart, cartItems, removeItem, finishOrder }) => {
    return (
        <>
        <IconButton style={{}} onClick={toggleCart} id="al" aria-label="Cart-View-Button">
            <Avatar>
                <ShoppingBasketIcon fontSize="large" htmlColor="black"/>
            </Avatar>
        </IconButton>

        <Drawer anchor="right" open={isOpen} onClose={toggleCart} aria-label="Cart-Item">
            <div style={{ width: '250px' }}>
                <List>
                    {cartItems.map((item, index) => (
                        <ListItemButton key={index} onClick={() => (removeItem(index))}>
                            <ListItem key={index}>
                                <ListItemText aria-label={"Remove" + item.drink_name + "from order"} primary={item.drink_name + "  ❌"} secondary={`Price: ${"$" + item.unit_price}`} />
                            </ListItem>
                        </ListItemButton>
                    ))}
                    <Button onClick={finishOrder} variant="contained" style={{backgroundColor: '#ce0e2d', marginRight: '1rem', marginLeft: '1rem'}}>Back to Order</Button>
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
    finishOrder(): void,
}

const Cart: React.FC<CartProps> = ({order, removeItem, finishOrder}) => {
    const [cartOpen, setCartOpen] = useState(false);

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };


    return (
        <Box sx={{ display: 'flex', alignItems: 'center', ml:'auto', justifyItems: 'flex-end'}}>
            <>{order.length}</>
            <CartDisplay finishOrder={finishOrder} isOpen={cartOpen} toggleCart={toggleCart} cartItems={order} removeItem={removeItem}/>
        </Box>
    );  
}

interface PriceDisplayProps {
    total_price: Number
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({total_price}) => {
    return (
        <Typography variant="h4">
            {"$" + total_price.toFixed(2)}
        </Typography>
    )
}

/**
 * OrderBarProps
 */
interface OrderBarProps {
    order: drinks[],
    clearOrder(): void,
    finishOrder(): void,
    back(): void,
    removeItem(index: number): void,
}

/**
 * Informational and Action bar for Order page
 * 
 * @param order The user's current order
 * @param clearOrder Callback to clear the order on button press
 * @param finishOrder Callback to submitt order on button press
 * @param back Callback to change page state on button press
 * @param removeItem Callback to remove a specific drink item on press
 * @returns {Element} Order Bar Component
 */
const OrderBar: React.FC<OrderBarProps> = ({order, clearOrder, finishOrder, back, removeItem}) => {
    // Total Price of current order
    const total_price = order.length !== 0 && order !== null ? order.map((item) => item.unit_price).reduce((acc, curr) => acc! + curr!)! : 0.00;

    return (
        <Paper sx={{display: "static", marginTop:'0', width: '100%', height: '5rem', background: '#71797E'}}>
            <Grid container spacing={{}} columns={{ xs: 12, sm: 12, md: 12 }} sx={{height: '100%'}}>
                <Grid item xs={4} sm={4} md={4} sx={{display: 'flex', alignItems: 'center'}}>
                    <Button onClick={finishOrder} variant="contained" style={{backgroundColor: '#ce0e2d', marginRight: '1rem', marginLeft: '1rem'}}>Finish Order</Button>
                    <Button onClick={back} variant="contained" style={{backgroundColor: '#ce0e2d'}}>Back</Button>
                </Grid>
                <Grid item xs={4} sm={4} md={4} sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <PriceDisplay total_price={total_price}/>
                </Grid>
                <Grid item xs={4} sm={4} md={4} sx={{display:"flex", justifyItems:'flex-end'}}>
                    <Cart finishOrder={finishOrder} order={order} clearOrder={clearOrder} removeItem={removeItem}/>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default OrderBar;
