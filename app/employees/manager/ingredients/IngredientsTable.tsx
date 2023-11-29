'use client'

import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper } from "@mui/material";
import { ingredients } from "@prisma/client";
import React from "react";

interface IngredientProps {
    ingredients: { id: number; name: string | null; quantity: number | null; unit_price: string | null; min_quantity: number | null;}[],
    changeIngredient(newIngredient: ingredients): void
}


const IngredientsTable: React.FC<IngredientProps> = ({ingredients, changeIngredient}) => {
    return ingredients.length > 0 ? (
            <TableContainer component={Paper} sx={{padding: '1rem'}}>
                <Table sx={{  }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Id</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Unit Price</TableCell>
                            <TableCell align="right">Min Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ingredients.map((row) => (
                            <TableRow
                            onClick = {() => changeIngredient(row)}
                            key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="right">{row.id}</TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{"$" + row.unit_price}</TableCell>
                            <TableCell align="right">{row.min_quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    ) : (
        <div>No Ingredients Found</div>
    );
}

export default IngredientsTable;