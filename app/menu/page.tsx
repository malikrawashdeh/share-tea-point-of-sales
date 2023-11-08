'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { getDrinks } from '@/lib/orderQueries';
import { drinks } from '@prisma/client';

const Menu = () => {
  const [drinks, setDrinks] = useState(new Array<drinks>());

  useEffect(() => {
    const fetchData = async () => {
      const drinksData = await getDrinks();
      setDrinks(drinksData);
    };
    fetchData();
  }, []); 

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {drinks.map((drink, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>

                <CardMedia
                  component="img"
                  alt={drink!.drink_name!}
                  height="200"
                  image="https://static.vecteezy.com/system/resources/thumbnails/024/933/352/small/refreshing-milkshake-with-chocolate-and-fruit-on-wooden-table-background-generated-by-ai-free-photo.jpg"
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {drink.drink_name}
                  </Typography>
                </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Menu;
