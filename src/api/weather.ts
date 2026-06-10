import axios from "axios";
import { type WeatherData } from "../types/weather";
import { type ForecastData } from "../types/weather";

const API_KEY = import.meta.env.VITE_API_KEY;

export const getWeather = async (city: string): Promise<WeatherData> => {
  const { data } = await axios.get<WeatherData>(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        units: "metric",
        appid: API_KEY,
      },
    },
  );

  return data;
};

export const getForecast = async (city: string): Promise<ForecastData> => {
  const { data } = await axios.get<ForecastData>(
    "https://api.openweathermap.org/data/2.5/forecast",
    {
      params: {
        q: city,
        units: "metric",
        appid: API_KEY,
      },
    },
  );
  return data;
};
