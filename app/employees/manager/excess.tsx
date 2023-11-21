'use client'

import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ingredients } from "@prisma/client";
import React, { useEffect, useState } from "react";

export default function Excess() {
    const [data, setData] = useState(new Array<ingredients>());
    const [loading, setLoading] = useState(true);

    const getData = React.useCallback(async () => {
        setLoading(true);
        const response = await fetch('/api/excessReport', {});
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
            <Table sx={{  }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Ingredient</TableCell>
                            <TableCell align="right">Current Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                            key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
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