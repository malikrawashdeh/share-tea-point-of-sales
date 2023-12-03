'use client'

import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import React from "react";

interface CategoriesProps { 
    categories: Array<string>,
    setTableState(table: string): void, 
}

/**
 * Order component to display drink categories and allow naviagation to specific drink pages
 * 
 * @param categories All possible store categories
 * @param setTableState The category selected by the user
 * @returns 
 */
const Categories: React.FC<CategoriesProps> = ({categories, setTableState}) => {
    return (
        <>
        {Array.from(categories).map((value, index) => (
            <Grid item xs={2} sm={4} md={4} key={index} style={{}}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => {setTableState(value)}}>
                        <CardMedia
                        component="img"
                        image="https://static.vecteezy.com/system/resources/thumbnails/024/933/352/small/refreshing-milkshake-with-chocolate-and-fruit-on-wooden-table-background-generated-by-ai-free-photo.jpg"
                        height="10"
                        alt=""
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {value}
                            </Typography>
                        </CardContent>
                </CardActionArea>
                </Card>
            </Grid>
        ))}
        </>
    )
}

export default Categories;