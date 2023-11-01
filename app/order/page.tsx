'use client'

import Categories from "./Categories";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { getDrinksWithinCategories, submitOrder } from "@/lib/orderQueries";``
import { drinks } from "@prisma/client";
import { useEffect, useState } from "react";
import React from "react";
import OrderBar from "./OrderBar";
import DrinksDisplay from "./DrinksDisplay";

export default function Page() { 
    const [loading, setLoading] = useState(true);
    const [menu, setMenu] = useState(new Map<string, drinks[]>());
    const [table, setTable] = useState('categories');
    const [drink, setDrink] = useState<drinks>();
    const [order, setOrder] = useState<Array<drinks>>(new Array<drinks>());

    const getMenu = React.useCallback(async () => {
        setLoading(true);
        const menu = await getDrinksWithinCategories();
        setMenu(menu);
        setLoading(false);
    }, []);

    const submitOrderCustomer = React.useCallback(async (order: drinks[]) => {
        await submitOrder(order);
    }, []);

    const changeDrinkState = (drink: drinks) => {
        setDrink(drink);
    }

    const changeTableState = (table: string) => {
        setTable(table);
    }

    const addDrinkToOrder = (drink: drinks) => {
        setOrder([...order, drink]);
    }

    const clearOrder = () => {
        setOrder([]);
    }

    const finishOrder = () => {
        submitOrderCustomer(order);
        clearOrder();
    }

    useEffect(() => {
        if (menu.size === 0) {
            getMenu();
        }
    }, []);

    if (loading) {
        return (
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
        );
    }
    else if (table === 'categories') {
        return (
            <main>
                <Container style={{alignItems:'center', justifyContent:'center'}}>
                    <OrderBar order={order} clearOrder={clearOrder} finishOrder={finishOrder}></OrderBar>
                </Container>

                <Container style={{alignItems:'center', justifyContent:'center'}}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{padding: '1rem',}}>
                        <Categories categories={Array.from(menu.keys())} setTableState={changeTableState}></Categories>
                    </Grid>
                </Container>
            </main>
        );
    }
    else if (table === 'payment') {
        return (
            <main>

            </main>
        );
    }
    else {
        return (
            <main>
                <Container style={{alignItems:'center', justifyContent:'center'}}>
                    <OrderBar order={order} clearOrder={clearOrder} finishOrder={finishOrder}></OrderBar>
                </Container>

                <Container style={{alignItems:'center', justifyContent:'center'}}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{padding: '1rem',}}>
                        <DrinksDisplay drinkCategoryMap={menu} category={table} setDrink={changeDrinkState} addDrinkToOrder={addDrinkToOrder}></DrinksDisplay>
                    </Grid>
                </Container>
            </main>
        );
    }
}