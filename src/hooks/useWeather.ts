import { useState } from "react";
import { getWeather, getForecast } from "../api/weather";
import { type ForecastItem, type WeatherData } from "../types/weather";
import axios from "axios";

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [error, setError] = useState("");

  const fetchWeather = async (city: string) => {
    const weatherData = await getWeather(city);
    const forecastData = await getForecast(city);

    const dailyForecast = forecastData.list.filter((item) =>
      item.dt_txt.includes("12:00:00"),
    );

    setWeather(weatherData);
    setForecast(dailyForecast.slice(0, 5));

    try {
      setLoading(true);
      setError("");
      const data = await getWeather(city);
      setWeather(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
         if (err.response?.status === 404) {
            setError("Город не найден");
         } else {setError("Ошибка получения данных")}
      } else {
         setError("Неизвестная ошибка");
      }
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  return { weather, forecast, loading, error, fetchWeather };
}
