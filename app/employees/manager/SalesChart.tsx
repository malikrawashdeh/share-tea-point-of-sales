'use client'

import { Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import { useState } from "react";
import { getSalesData } from "@/lib/orderQueries";
import dayjs, { Dayjs } from "dayjs";

type salesResponseItem = {
    drink_id: Number;
    drink_name: String;
    sales: Number;
};

interface props {
    beginDate: Dayjs | null;
    endDate: Dayjs | null;
};

const SalesChart: React.FC<props> = ({ beginDate, endDate }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(new Array<salesResponseItem>());
    const [chartBeginDate, setChartBeginDate] = useState(dayjs(new Date()));
    const [chartEndDate, setChartEndDate] = useState(dayjs(new Date()));

    const getData = React.useCallback(async (beginDate: Date, endDate: Date) => {
        const result = await getSalesData(beginDate, endDate);
        setData(result);
    }, []);

    useEffect(() => {
        setLoading(true);
        if (beginDate !== null && endDate !== null) {
            if (beginDate !== chartBeginDate || endDate !== chartEndDate) {
                setChartBeginDate(beginDate);
                setChartEndDate(endDate);
            }
            getData(beginDate.toDate(), endDate.toDate());            
        }
        setLoading(false);
    }, [getData, beginDate, endDate]);

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
        minHeight="auto" // You can adjust this to fit your design needs
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

export default SalesChart;