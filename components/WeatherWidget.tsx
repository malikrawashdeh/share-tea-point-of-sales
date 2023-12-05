"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { createKey } from "next/dist/shared/lib/router/router";

/* Instruments */
import {
  useSelector,
  useDispatch,
  selectTemp,
  getWeatherAsync,
} from "@/lib/redux";
import Image from "next/image";

const WeatherWidget: React.FC = () => {
  const { temp: cur_temp, status, icon } = useSelector(selectTemp);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cur_temp) {
      if (cur_temp === undefined) {
        dispatch(getWeatherAsync({ lat: 30.62410297405949, long: -96.33967039810574 }));
      }
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }, [dispatch, cur_temp]);

  return (
    <div>
      {status === "idle" && cur_temp ? (
        // display current temperature and weather icon side by side
        <span
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* insert image of current weather icon */}
          <img
            src={`https://openweathermap.org/img/w/${icon}.png`}
            alt="Weather Icon"
            style={{ marginRight: "0.5rem" }}
          />
          <Typography variant="body1">{cur_temp}°F</Typography>
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default WeatherWidget;
