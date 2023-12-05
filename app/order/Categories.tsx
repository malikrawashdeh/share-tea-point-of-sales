'use client'

import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import React from "react"; 

interface CategoriesProps { 
    categories: Array<{cat_name: string, image: string}>,
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
                <CardActionArea onClick={() => {setTableState(value.cat_name)}}>
                        <CardMedia
                        component="img"
                        image={value.image}
                        height="10"
                        alt=""
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {value.cat_name}
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