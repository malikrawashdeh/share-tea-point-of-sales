import { useEffect, useState } from "react";
import { BarChart } from "@/node_modules/@mui/icons-material/index";
import React from "react";

export default function Chart() {
    const [sales, setSales] = useState(null);
    const [loading, setLoading] = useState(true);

    const getSalesData = React.useCallback(async () => {
        setLoading(true);
        const res = await fetch("/api/getDataRange");
        const data = await res.json();
        setSales(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        getSalesData();
    }, []);

    return (
        
    );
}