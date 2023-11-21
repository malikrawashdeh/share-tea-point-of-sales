"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

const WeatherWidget: React.FC = () => {
  const [cur_temp, setTemp] = useState<number | null>(null);

  const fetchWeatherData = (lat: number, lon: number) => {
    console.log("fetching...." + lat + " " + lon);
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&temperature_unit=fahrenheit&forecast_days=1`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch weather data: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        const temperature = data.current.temperature_2m;
        setTemp(temperature);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }, []);

  return (
    <Card>
      <CardContent>
        {/* <Typography variant="h5" component="div">
          Weather Widget
        </Typography> */}
        {cur_temp ? (
          <div>
            {/* <Typography variant="h6">City: {weatherData.name}</Typography> */}
            <Typography variant="body1">Temperature: {cur_temp}°F</Typography>
            {/* <Typography variant="body1">
              Weather: {weatherData.weather[0].description}
            </Typography> */}
          </div>
        ) : (
          <Button
            variant="contained"
            onClick={() => fetchWeatherData(0, 0)} // Provide default coordinates if geolocation is not available
            style={{ marginTop: "10px" }}
          >
            Get Weather for Current Location
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
