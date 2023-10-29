'use client'

import Categories from "./Categories";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { getDrinksWithinCategories } from "@/lib/orderQueries";
import { useOrder } from "./OrderContext";
import { drinks } from "@prisma/client";
import { createContext, useEffect, useState } from "react";
import React from "react";
import Drinks from "./Drinks";
import OrderBar from "./OrderBar";

export default function Page() { 
    const [loading, setLoading] = useState(true);
    const [menu, setMenu] = useState(new Map<string, drinks[]>());
    const [table, setTable] = useState('categories');

    const getMenu = React.useCallback(async () => {
        setLoading(true);
        const menu = await getDrinksWithinCategories();
        setMenu(menu);
        setLoading(false);
    }, []);

    const changeTableState = (table: string) => {
        setTable(table);
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
                    <OrderBar></OrderBar>
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
                    <OrderBar></OrderBar>
                </Container>

                <Container style={{alignItems:'center', justifyContent:'center'}}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{padding: '1rem',}}>
                        <Drinks drinkCategoryMap={menu} category={table}></Drinks>
                    </Grid>
                </Container>
            </main>
        );
    }
}