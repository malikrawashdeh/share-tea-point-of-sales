'use client'

import DrinkTable from "./DrinkTable";
import {useEffect, useState } from "react";
import { drinks } from "@prisma/client";
import React from "react";
import Popup from "./Popup";
import { Box, Button, CircularProgress } from "@mui/material";
import FormDialog from "./FormDialog";

const DrinksPage = () => {
    const [selectedDrink, setSelectedDrink] = useState<drinks>();
    const [drinks, setDrinks] = useState<drinks[]>();
    const [loading, setLoading] = useState(true);

    const dummy_drink: drinks = {
        id: -1,
        drink_name: 'N/A',
        category_name: 'N/A',
        unit_price: -1.0,
        desc: 'N/A'
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
        <div>
            <Button variant="outlined" sx={{marginBottom: '1.5rem'}} onClick={() => {setSelectedDrink(dummy_drink)}}>
                Create New Drink
            </Button>
            <DrinkTable drinks={drinks!} changeDrink={changeDrink}/>
            <FormDialog drink={selectedDrink} handleModalClose={handleModalClose}/>
        </div>
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