'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { getDrinks } from '@/lib/orderQueries';
import { drinks } from '@prisma/client';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const Menu = () => {
  const [drinks, setDrinks] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const drinksData = await getDrinks();
      setDrinks(drinksData);
    };
    fetchData();
  }, []); 

  const handleCardClick = (drink) => {
    setSelectedDrink(drink);
  };

  const handleCloseModal = () => {
    setSelectedDrink(null);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {drinks.map((drink, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card onClick={() => handleCardClick(drink)}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={drink.drink_name}
                  height="200"
                  image="https://static.vecteezy.com/system/resources/thumbnails/024/933/352/small/refreshing-milkshake-with-chocolate-and-fruit-on-wooden-table-background-generated-by-ai-free-photo.jpg"
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {drink.drink_name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for displaying drink description */}
      <Modal
        open={!!selectedDrink}
        onClose={handleCloseModal}
        aria-labelledby="drink-description-modal"
        aria-describedby="drink-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 2,
          }}
        >
          <Typography variant="h5" component="div" color = "black">
            {selectedDrink?.drink_name}
          </Typography>
          <Typography variant="body2" id="drink-description" sx={{ mt: 2 }} color = "black">
            {"selectedDrink?.description"}
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default Menu;