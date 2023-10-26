'use client'

import { Card, Grid } from "@mui/material";
import React from "react";

interface CategoriesProps { 
    categories: Array<string> 
}

const Categories: React.FC<CategoriesProps> = ({categories}) => {
    return (
        <div>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {Array.from(Array(6)).map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                <Card>xs=2</Card>
                </Grid>
            ))}
            </Grid>
        </div>
    )
}

export default Categories;