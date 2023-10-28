'use client'

import Categories from "./Categories";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { getDrinksWithinCategories } from "@/lib/orderQueries";
import { useOrder } from "./OrderContext";
import { drinks } from "@prisma/client";
import { createContext, useEffect, useState } from "react";
import React from "react";

export default function Page() { 
    const [loading, setLoading] = useState(true);
    const [menu, setMenu] = useState(new Map<string, drinks[]>());

    // const {order, dispatch} = useOrder();
    // const OrderContext = createContext<{ order: OrderState; dispatch: Dispatch<OrderAction> } | undefined>(undefined);
    // const [newOrderItem, setNewOrderItem] = useState<drinks>({
    //     id: -1,
    //     drink_name: 'invalid',
    //     category_name: 'invalid',
    //     unit_price: -1.00
    // });

    const getMenu = React.useCallback(async () => {
        setLoading(true);
        const menu = await getDrinksWithinCategories();
        setMenu(menu);
        setLoading(false);
    }, []);

    useEffect(() => {
        getMenu();
    }, []);

    return !loading ? (
        <main>
            <Container style={{alignItems:'center', justifyContent:'center'}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{padding: '1rem',}}>
                    <Categories categories={Array.from(menu.keys())}></Categories>
                </Grid>
            </Container>
        </main>
    ) : (
        <main>
            <Box 
            sx={{ display: 'flex' }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh">
                <CircularProgress sx={{color: 'red'}}/>
            </Box>
        </main>
    )
}