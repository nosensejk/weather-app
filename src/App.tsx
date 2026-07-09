import { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import { useWeather } from "./hooks/useWeather";
import Loader from "./components/Loader";
import ForecastList from "./components/ForecastList";
import { Search, CloudSun } from "lucide-react"; // Добавили иконку для приветствия
import { motion } from "framer-motion";

function App() {
  const [city, setCity] = useState("");
  const { weather, forecast, loading, error, fetchWeather } = useWeather();

  const handleSearch = () => {
    if (!city.trim()) return;
    fetchWeather(city);
    setCity("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getBg = (weatherMain?: string) => {
    if (!weatherMain) return "clear";
    switch (weatherMain.toLowerCase()) {
      case "clear":
        return "clear";
      case "clouds":
        return "clouds";
      case "rain":
      case "drizzle":
        return "rain";
      case "snow":
        return "snow";
      case "thunderstorm":
        return "storm";
      default:
        return "clear";
    }
  };

  // Проверяем, пустой ли экран (нет загрузки, нет ошибки и данные ещё не получены)
  const isInitialState =
    !loading && !error && !weather && forecast.length === 0;

  return (
    <div className={`app ${getBg(weather?.weather[0].main)}`}>
      <div className="layout">
        {/* КРАСИВОЕ ПРИВЕТСТВИЕ НА СТАРТЕ */}
        {isInitialState && (
          <motion.div
            className="welcome-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <CloudSun size={64} className="welcome-icon" />
            <h1>Weather App</h1>
            <p>Узнайте точный прогноз погоды в любом городе прямо сейчас</p>
          </motion.div>
        )}
        <div className="search-container">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Введите город..."
            className="search-input"
          />
          <button
            onClick={handleSearch}
            className="search-button"
            aria-label="Поиск"
          >
            <Search size={20} />
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
        {loading && <Loader />}

        {!loading && (weather || forecast.length > 0) && (
          <div className="main-info">
            <div className="content">
              {weather && <WeatherCard weather={weather} />}
            </div>

            <div className="sidebar">
              {forecast.length > 0 && <ForecastList forecast={forecast} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
