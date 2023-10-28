'use client'

import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Link, Typography } from "@mui/material";
import { drinks } from "@prisma/client";
import { useParams } from "next/navigation";

interface DrinkCardGridProps {
    drinkCategoryMap: Map<string, drinks[]>
}

const DrinkCardGrid: React.FC<DrinkCardGridProps> = ({drinkCategoryMap}) => {
    const params = useParams();
    const category = typeof params['category'] === "string" ? params['category'] : "";
    const drinks = drinkCategoryMap.get(category) ?? new Array<drinks>();

    return (
        <>
        {drinks.map((value, index) => (
            <Grid item xs={2} sm={4} md={4} key={index} style={{}}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <Link href={"/"}>
                            <CardMedia
                            component="img"
                            image="https://static.vecteezy.com/system/resources/thumbnails/024/933/352/small/refreshing-milkshake-with-chocolate-and-fruit-on-wooden-table-background-generated-by-ai-free-photo.jpg"
                            height="10"
                            alt=""
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {value.drink_name}
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
        </>
    );
};

export default DrinkCardGrid;