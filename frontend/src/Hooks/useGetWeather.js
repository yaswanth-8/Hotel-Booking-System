import { useEffect, useState } from "react";

const useGetWeather = (city) => {
  const [temperature, setTemperature] = useState(null);
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        const roundedTemperature = Math.round(data?.main?.temp);
        setTemperature(roundedTemperature);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, [apiUrl]);

  return temperature;
};

export default useGetWeather;
