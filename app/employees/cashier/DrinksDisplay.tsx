'use client'

import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Link, Typography } from "@mui/material";
import { drinks } from "@prisma/client";

interface DrinkCardGridProps {
    drinkCategoryMap: Map<string, drinks[]>,
    category: string,
    setDrink(drink: drinks): void,
    addDrinkToOrder(drink: drinks): void
}

const DrinksDisplay: React.FC<DrinkCardGridProps> = ({drinkCategoryMap, category, setDrink, addDrinkToOrder}) => {
    const drinks = drinkCategoryMap.get(category) ?? new Array<drinks>();

    return (
        <>
        {drinks.map((value, index) => (
            <Grid item xs={2} sm={4} md={4} key={index} style={{}}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea onClick={() => {setDrink(value); addDrinkToOrder(value)}}>
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
                                <Typography variant="body1" color="text.primary">
                                    {`${"$" + value.unit_price}`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {value.desc}
                                </Typography>
                            </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        ))}
        </>
    );
};

export default DrinksDisplay;