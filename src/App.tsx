import { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import { useWeather } from "./hooks/useWeather";
import Loader from "./components/Loader";
import ForecastList from "./components/ForecastList";

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

  return (
    <div className={`app ${getBg(weather?.weather[0].main)}`}>
      <div className="layout">
        <div className="search">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Введите город..."
          />

          <button onClick={() => fetchWeather(city)}>Поиск</button>
          {/* ERROR */}
        </div>
        {error && <div className="error-message">{error}</div>}
        {loading && <Loader/>}
        {!loading && <div className="main-info">
          <div className="content">
            {/* WEATHER */}
            {weather && <WeatherCard weather={weather} />}
          </div>

          {/* SIDEBAR FORECAST */}
          <div className="sidebar">
            {forecast.length > 0 && <ForecastList forecast={forecast} />}
          </div>
        </div>}
      </div>
    </div>
  );
}

export default App;
