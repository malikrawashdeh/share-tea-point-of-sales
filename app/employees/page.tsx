'use client'

import Subheader from "@/components/Subheader";
import { Card, CardActionArea, CardContent, CardMedia, Container, Paper, Typography } from "@mui/material";

/**
 * Component for the employees dashboard
 * @returns Employees dashboard component
 */
export default function Page() {
  return (
    // create me centered container with h1 and p
    <Container maxWidth="sm">
      <Subheader text="Employees"/>
      <Container sx={{my:'auto'}}>
        <Card sx={{my:'1rem'}}>
            <CardActionArea href="/order">
              <CardMedia
                component="img"
                height="200"
                image="https://static.vecteezy.com/system/resources/thumbnails/024/933/352/small/refreshing-milkshake-with-chocolate-and-fruit-on-wooden-table-background-generated-by-ai-free-photo.jpg"
              />
              <CardContent>
                <Typography variant="h6" component="div" color="black">
                  Cashier View
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        <Card sx={{my:'1rem'}}>
            <CardActionArea href="/employees/manager">
              <CardMedia
                component="img"
                height="200"
                image="https://static.vecteezy.com/system/resources/thumbnails/024/933/352/small/refreshing-milkshake-with-chocolate-and-fruit-on-wooden-table-background-generated-by-ai-free-photo.jpg"
              />
              <CardContent>
                <Typography variant="h6" component="div" color="black">
                  Manager View
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
      </Container>
    </Container>
  );
}
