'use client'

import DrinkTable from "./DrinkTable";
import {useEffect, useState } from "react";
import { drinks } from "@prisma/client";
import React from "react";
import { Box, Button, CircularProgress, Container } from "@mui/material";
import FormDialog from "./FormDialog";
import Link from "next/link";

/**
 * Main Component Page for drinks table
 * 
 * @returns Drinks Table Page element
 */
const DrinksPage = () => {
    const [selectedDrink, setSelectedDrink] = useState<drinks>();
    const [drinks, setDrinks] = useState<drinks[]>();
    const [loading, setLoading] = useState(true);

    const dummy_drink: drinks = {
        id: -1,
        drink_name: 'N/A',
        category_name: 'N/A',
        unit_price: -1.0,
        desc: 'N/A',
        image_link: 'https://static.vecteezy.com/system/resources/thumbnails/024/933/352/small/refreshing-milkshake-with-chocolate-and-fruit-on-wooden-table-background-generated-by-ai-free-photo.jpg'
    };

    const changeDrink = (newDrink: drinks) => {
        setSelectedDrink(newDrink);
        console.log(newDrink);
    }

    const handleModalClose = () => {
        setSelectedDrink(undefined);
    }

    const grabDrinks = React.useCallback(async () => {
        setLoading(true);
        const result = await fetch('/api/drinks/', {});
        const data = await result.json();
        console.log(data);
        setDrinks(data.result);
        setLoading(false);
    }, []);

    useEffect(() => {
        grabDrinks();
    }, []);

    return !loading ? (
        <main>
            <Container sx={{padding: '0.5rem'}}>
                <Link href="/employees/manager">
                    <Button variant="contained" sx={{marginBottom: '1.5rem', mx: '1rem'}} style={{backgroundColor: '#ce0e2d'}}>
                        Back
                    </Button>
                </Link>
                <Button variant="contained" sx={{marginBottom: '1.5rem'}} style={{backgroundColor: '#ce0e2d'}} onClick={() => {setSelectedDrink(dummy_drink)}}>
                    Create New Drink
                </Button>
                <DrinkTable drinks={drinks!} changeDrink={changeDrink}/>
                <FormDialog drink={selectedDrink} handleModalClose={handleModalClose}/>
            </Container>
        </main>
    ) : (
        <Box 
            sx={{ display: 'flex' }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh">
            <CircularProgress sx={{color: 'red'}}/>
        </Box>
    )
}

export default DrinksPage;