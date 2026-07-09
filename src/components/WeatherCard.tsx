import { type WeatherData } from "../types/weather";
import { Thermometer, Droplets, Wind, Gauge } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  weather: WeatherData;
};

export default function WeatherCard({ weather }: Props) {
  const icon = weather.weather[0].icon;

  return (
    <motion.div
      className="weather-card"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>{weather.name}</h1>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
        alt={weather.weather[0].description}
      />
      <div className="temperature-desc">
        <h2>{Math.round(weather.main.temp)}°C</h2>
        <p className="description">{weather.weather[0].description}</p>
      </div>

      <div className="weather-info">
        <div className="info-item">
          <Thermometer className="info-icon" size={22} />
          <div className="info-text">
            <p>{Math.round(weather.main.feels_like)}°C</p>
            <small>Ощущается</small>
          </div>
        </div>
        <div className="info-item">
          <Droplets className="info-icon" size={22} />
          <div className="info-text">
            <p>{weather.main.humidity}%</p>
            <small>Влажность</small>
          </div>
        </div>
        <div className="info-item">
          <Wind className="info-icon" size={22} />
          <div className="info-text">
            <p>{weather.wind.speed} м/с</p>
            <small>Ветер</small>
          </div>
        </div>
        <div className="info-item">
          <Gauge className="info-icon" size={22} />
          <div className="info-text">
            <p>{weather.main.pressure} гПа</p>
            <small>Давление</small>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
