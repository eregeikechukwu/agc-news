"use client";

import { useEffect, useState } from "react";
import ReactWeather, { useOpenWeather } from "react-open-weather";

interface Position {
  latitude: number;
  longitude: number;
}

export default function Weather() {
  const [position, setPosition] = useState<Position>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition({ latitude, longitude });
    });
  }, []);

  const { data, isLoading, error } = useOpenWeather({
    key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
    lat: position.latitude,
    lon: position.longitude,
    lang: "en",
    unit: "metric",
  });

  console.log("API key", process.env.NEXT_PUBLIC_WEATHER_API_KEY);

  console.log(position);
  return (
    <canvas>
      <ReactWeather
        isLoading={isLoading}
        errorMessage={error}
        data={data}
        lang="en"
        locationLabel="Munich"
        unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
        showForecast
      />
    </canvas>
  );
}
