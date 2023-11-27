export const fetchTempCall = async (
  lat: number = 0,
  lon: number = 0
): Promise<any> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=imperial`
  );
  const result = await response.json();

  return result;
};
