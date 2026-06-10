import { type WeatherData } from "../types/weather";

type Props = {
  weather: WeatherData;
};

export default function WeatherCard({ weather }: Props) {
  const icon = weather.weather[0].icon;
  return (
    <div className="weather-card">
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
        <div>
          <span>🌡️</span>
          <p>{Math.round(weather.main.feels_like)}°C</p>
          <small>Ощущается</small>
        </div>
        <div>
          <span>💧</span>
          <p>{weather.main.humidity}%</p>
          <small>Влажность</small>
        </div>
        <div>
          <span>🌬️</span>
          <p>{weather.wind.speed} м/с</p>
          <small>Ветер</small>
        </div>
        <div>
          <span>📈</span>
          <p>{weather.main.pressure} м/с</p>
          <small>Давление</small>
        </div>
      </div>
    </div>
  );
}
