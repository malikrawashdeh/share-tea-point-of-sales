'use client'

import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ingredients } from "@prisma/client";
import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { getExcess } from "@/lib/orderQueries";

interface props {
    beginDate: Dayjs;
};

const Excess: React.FC<props> = ({ beginDate }) => {
    const [data, setData] = useState(new Array<ingredients>());
    const [loading, setLoading] = useState(true);

    const getData = React.useCallback(async (beginDate: Date) => {
        const result = await getExcess(beginDate);
        setData(result);
    }, []);

    useEffect(() => {
        setLoading(true);
        getData(beginDate.toDate());
        setLoading(false);
    }, [beginDate]);

    return !loading ? (
        <TableContainer sx={{color:'white'}}>
            <Table sx={{ color:'white' }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{}}>
                            <TableCell sx={{}} align="right">Ingredient</TableCell>
                            <TableCell sx={{}} align="right">Current Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                            key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
                            <TableCell sx={{}} align="right">{row.name}</TableCell>
                            <TableCell sx={{}} align="right">{row.quantity}</TableCell>
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

export default Excess;