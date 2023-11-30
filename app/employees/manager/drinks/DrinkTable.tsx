'use client'

import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper } from "@mui/material";
import { drinks } from "@prisma/client";
import React from "react";

interface DrinkProps {
    drinks: drinks[],
    changeDrink(newDrink: drinks): void
}

const DrinkTable: React.FC<DrinkProps> = ({drinks, changeDrink}) => {
    return drinks.length > 0 ? (
            <TableContainer component={Paper} sx={{padding: '1rem'}}>
                <Table sx={{  }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Id</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Category</TableCell>
                            <TableCell align="right">Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {drinks.map((row) => (
                            <TableRow
                            onClick = {() => changeDrink(row)}
                            key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="right">{row.id}</TableCell>
                            <TableCell align="right">{row.drink_name}</TableCell>
                            <TableCell align="right">{"$" + row.unit_price}</TableCell>
                            <TableCell align="right">{row.category_name}</TableCell>
                            <TableCell align="right">{row.desc}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    ) : (
        <div>No Drinks Found</div>
    );
}

export default DrinkTable;