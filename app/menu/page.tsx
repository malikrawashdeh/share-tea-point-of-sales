'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { getDrinks } from '@/lib/orderQueries';
import { drinks } from '@prisma/client';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


import Button from '@mui/material/Button';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Menu = () => {
  const [drinks, setDrinks] = useState(new Array<drinks>());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDrink, setSelectedDrink] = useState<drinks | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const drinksData = await getDrinks();
      setDrinks(drinksData);
    };
    fetchData();
  }, []); 

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedDrink(null); // Reset selected drink when changing categories
  };

  const handleDrinkClick = (drink: drinks) => {
    setSelectedDrink(drink);
  };

  const handleBackButtonClick = () => {
    setSelectedCategory(null);
  };

  const handleCloseModal = () => {
    setSelectedDrink(null);
  };

  return (
    <Container maxWidth="lg">
      {/* Back button when a drink is selected */}
      {selectedCategory && (
        <Button onClick={handleBackButtonClick} startIcon={<ArrowBackIcon />} sx={{ marginBottom: 2 }}>
          Back to Categories
        </Button>
      )}

      {/* Display all drink categories as cards */}
      {!selectedCategory &&
        <Grid container spacing={2}>
          {Array.from(new Set(drinks.map((drink) => drink.category_name))).map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card onClick={() => handleCategoryClick(category!)}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={category!}
                    height="200"
                    image= "https://static.vecteezy.com/system/resources/thumbnails/024/933/352/small/refreshing-milkshake-with-chocolate-and-fruit-on-wooden-table-background-generated-by-ai-free-photo.jpg"
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" color="black">
                      {category}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      }

      {/* Display drinks within the selected category */}
      {selectedCategory && (
        <Grid container spacing={2}>
          {drinks
            .filter((drink) => drink.category_name === selectedCategory)
            .map((drink, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card onClick={() => handleDrinkClick(drink)}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={drink.drink_name!}
                      height="15"
                      image= {drink.image_link!}
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
      )}

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
            width: '25%',
            height: '50%',
            bgcolor: 'background.paper',
            border: '2px solid red',
            borderRadius: 8,
            p: 2,
            overflow: 'hidden',
            
          }}
        >
          {/* Display the image of the drink */}
          <img
            src={selectedDrink?.image_link!}
            alt={selectedDrink?.drink_name!}
            style={{ width: '100%', height: '55%', objectFit: 'contain', marginBottom: 8 }}
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
