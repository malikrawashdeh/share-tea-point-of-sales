'use client'

import IngredientTable from "./IngredientsTable";
import {useEffect, useState } from "react";
import { ingredients } from "@prisma/client";
import React from "react";
import { Box, Button, CircularProgress, Container } from "@mui/material";
import FormDialog from "./FormDialog";
import Link from "next/link";

/**
 * Main Component Page for ingredients table
 * 
 * @returns Drinks ingredients Page element
 */
const IngredientsPage = () => {
    const [selectedIngredient, setSelectedIngredient] = useState<ingredients>();
    const [ingredients, setIngredients] = useState<ingredients[]>();
    const [loading, setLoading] = useState(true);

    const dummy_ingredient: ingredients = {
        id: -1,
        name: 'N/A',
        unit_price: "N/A",
        quantity: -1,
        min_quantity: -1
    };

    const changeIngredient = (newIngredient: ingredients) => {
        setSelectedIngredient(newIngredient);
        console.log(newIngredient);
    }

    const handleModalClose = () => {
        setSelectedIngredient(undefined);
    }

    const grabIngredients = React.useCallback(async () => {
        setLoading(true);
        const result = await fetch('/api/ingredients/', {});
        const data = await result.json();
        console.log(data);
        setIngredients(data.result);
        setLoading(false);
    }, []);

    useEffect(() => {
        grabIngredients();
    }, []);

    return !loading ? (
        <main>
            <Container sx={{padding: '0.5rem'}}>
                <Link href="/employees/manager">
                    <Button variant="contained" sx={{marginBottom: '1.5rem', mx: '1rem'}} style={{backgroundColor: '#ce0e2d'}}>
                        Back
                    </Button>
                </Link>
                <Button variant="contained" sx={{marginBottom: '1.5rem'}} style={{backgroundColor: '#ce0e2d'}} onClick={() => {setSelectedIngredient(dummy_ingredient)}}>
                    Create New Ingredient
                </Button>
                <IngredientTable ingredients={ingredients!} changeIngredient={changeIngredient}/>
                <FormDialog ingredient={selectedIngredient} handleModalClose={handleModalClose}/>
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

export default IngredientsPage;