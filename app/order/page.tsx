'use client'

import Categories from "./Categories";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { getDrinksWithinCategories } from "@/lib/orderQueries";``
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

    const changeDrinkState = (drink: drinks) => {
        setDrink(drink);
        console.log(drink);
    }

    const changeTableState = (table: string) => {
        setTable(table);
    }

    const addDrinkToOrder = (drink: drinks) => {
        setOrder([...order, drink]);
        console.log(order);
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
                    <OrderBar order={order}></OrderBar>
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
                    <OrderBar order={order}></OrderBar>
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