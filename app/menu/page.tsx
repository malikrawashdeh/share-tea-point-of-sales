'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { getDrinks } from '@/lib/orderQueries';
import { drinks } from '@prisma/client';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


const Menu = () => {
  const [drinks, setDrinks] = useState(new Array<drinks>());
  const [selectedDrink, setSelectedDrink] = useState<drinks | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const drinksData = await getDrinks();
      setDrinks(drinksData);
    };
    fetchData();
  }, []); 

  const handleCardClick = (drink: drinks) => {
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
                  alt={drink!.drink_name!}
                  height="200"
                  image="https://static.vecteezy.com/system/resources/thumbnails/024/933/352/small/refreshing-milkshake-with-chocolate-and-fruit-on-wooden-table-background-generated-by-ai-free-photo.jpg"
                />
                <CardContent>
                  <Typography variant="h6" component="div" color="black">
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
            width: 400, // Set the width to your desired size
            height: 400, // Set the height to your desired size
            bgcolor: 'background.paper',
            border: '2px solid red', // Set border color to red
            borderRadius: 8, // Optional: Add border radius for a rounded appearance
            p: 2,
          }}
        >
          {/* Display the image of the drink */}
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/024/933/352/small/refreshing-milkshake-with-chocolate-and-fruit-on-wooden-table-background-generated-by-ai-free-photo.jpg"
            alt={selectedDrink?.drink_name!}
            style={{ width: '100%', marginBottom: 8 }}
          />

          <Typography variant="h5" component="div" color="black">
            {selectedDrink?.drink_name}
          </Typography>
          <Typography variant="body2" id="drink-description" sx={{ mt: 2 }} color="black">
            {selectedDrink?.desc}
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default Menu;