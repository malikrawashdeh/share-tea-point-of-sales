'use client'

import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

interface CategoriesProps { 
    categories: Array<string> 
}

const Categories: React.FC<CategoriesProps> = ({categories}) => {
    return (
        <Container style={{alignItems:'center', justifyContent:'center'}}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{padding: '1rem',}}>
            {Array.from(categories).map((value, index) => (
                <Grid item xs={2} sm={4} md={4} key={index} style={{}}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea >
                        <Link href={"/"}>
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
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </Link>
                    </CardActionArea>
                    </Card>
                </Grid>
            ))}
            </Grid>
        </Container>
    )
}

export default Categories;