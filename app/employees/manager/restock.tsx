'use client'

import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ingredients } from "@prisma/client";
import React, { useEffect, useState } from "react";

export default function Restock() {
    const [data, setData] = useState(new Array<ingredients>());
    const [loading, setLoading] = useState(true);

    const getData = React.useCallback(async () => {
        setLoading(true);
        const response = await fetch('/api/restockReport', {});
        const result = await response.json();
        setData(result.result);
        setLoading(false);
    }, []);

    useEffect(() => {
        getData();
        console.log(data);
    }, [getData]);

    return !loading ? (
        <TableContainer>
            <Table sx={{color: 'white'}} aria-label="simple table">
                    <TableHead sx={{color: 'white'}}>
                        <TableRow sx={{color: 'white'}}>
                            <TableCell sx={{color: 'white'}} align="right">Ingredient</TableCell>
                            <TableCell sx={{color: 'white'}} align="right">Current Quantity</TableCell>
                            <TableCell sx={{color: 'white'}} align="right">Minimum Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                            key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } , color: 'white'}}>
                            <TableCell sx={{color: 'white'}} align="right">{row.name}</TableCell>
                            <TableCell sx={{color: 'white'}} align="right">{row.quantity}</TableCell>
                            <TableCell sx={{color: 'white'}} align="right">{row.min_quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
        </TableContainer>
    ) : (
        <Box 
        sx={{ display: 'flex' }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh">
        <CircularProgress sx={{color: 'red'}}/>
        </Box>
    );
}