'use client'

import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper } from "@mui/material";
import React from "react";

interface DrinkProps {
    drinks: { id: number; drink_name: string | null; unit_price: number | null; }[]
}

const DrinkTable: React.FC<DrinkProps> = ({drinks}) => {
    return drinks.length > 0 ? (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{  }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Id</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {drinks.map((row) => (
                            <TableRow
                            key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="right">{row.id}</TableCell>
                            <TableCell align="right">{row.drink_name}</TableCell>
                            <TableCell align="right">{"$" + row.unit_price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    ) : (
        <div>No Drinks Found</div>
    );
}

export default DrinkTable;
