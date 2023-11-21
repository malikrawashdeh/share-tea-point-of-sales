"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Container } from "@mui/material";

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

const weather_code_convert = (code: Number) => {
    switch (code) {
        case 0:
            return "Clear Sky"
        case 1:
            return "Mainly Clear"
        case 2:
            return "Partly Cloudly"
        case 3:
            return "Overcast"
        case 45:
            return "Fog";
        case 48:
            return "Rime Fog";
        case 51:
        case 53:
        case 55:
            return "Drizzle";
        case 56:
        case 57:
            return "Freezing Drizzle";
        case 61:
        case 63:
        case 65:
            return "Rain";
        case 66:
        case 67:
            return "Freezing Rain";
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            return "Snow";
        case 80:
        case 81:
        case 82:
            return "Rain Showers";
        case 95:
            return "Thunderstorm";
        default:
            return "Unknow Weather";
    }
}

const WeatherWidgetCS: React.FC = () => {
  const [cur_temp, setTemp] = useState<number | null>(null);
  const [cur_code, setCode] = useState<string | null>(null);

  const fetchWeatherData = (lat: number, lon: number) => {
    console.log("fetching...." + lat + " " + lon);
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${30.62410297405949}&longitude=${-96.33967039810574}&current=temperature_2m,weather_code&temperature_unit=fahrenheit&forecast_days=1`
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
        const weather = data.current.weather_code;
        setTemp(temperature);
        setCode(weather_code_convert(weather));
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  useEffect(() => {
    fetchWeatherData(30.62410297405949, -96.33967039810574);
  }, []);

  return (
    <Container sx={{justifyContent: 'center', alignContent: 'center', background: 'white', borderRadius: '15px'}}>
        {/* <Typography variant="h5" component="div">
          Weather Widget
        </Typography> */}
        {cur_temp ? (
          <>
            {/* <Typography variant="h6">City: {weatherData.name}</Typography> */}
            <Typography color="black" variant="body1">Weather at Sharetea College Station</Typography>
            <Typography color="black" variant="body1">{cur_code} {cur_temp}°F</Typography>
            {/* <Typography variant="body1">
              Weather: {weatherData.weather[0].description}
            </Typography> */}
          </>
        ) : (
            <Typography color="black" variant="body1">Loading Weather</Typography>
        )}
    </Container>
  );
};

export default WeatherWidgetCS;
