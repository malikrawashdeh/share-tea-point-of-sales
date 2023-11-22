'use client'

import { Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import { useState } from "react";
import {GET} from "../../api/salesDataRange/route"

type salesResponseItem = {
    drink_id: Number;
    drink_name: String;
    sales: Number;
};

export default function SalesChart() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(new Array<salesResponseItem>());

    const getData = React.useCallback(async () => {
        setLoading(true);
        const response = await fetch('/api/salesDataRange', {});
        const result = await response.json();
        setData(result.result);
        setLoading(false);
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const chartFmtData = [
        [
          "Drink",
          "Sales ($)",
          { role: "style" },
          {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
          },
        ],
        ...data.map((item) => ([item.drink_name, item.sales, "green", null]))
    ];

    
    const options = {
        title: "Drink Sales",
        backgroundColor: '#E4E4E4',
        width: 600,
        height: 400,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    return !loading ? (
        <Box 
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh" // You can adjust this to fit your design needs
        sx={{ width: '100vw', maxWidth: '100%' }}
        >
        <Chart
        chartType="BarChart"
        width="auto"
        height="400px"
        data={chartFmtData}
        options={options}
        />
        </Box>
        ) : (
        <Box 
        sx={{ display: 'flex' }}
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        >
        <CircularProgress sx={{ color: 'red' }}/>
        </Box>
        );
}