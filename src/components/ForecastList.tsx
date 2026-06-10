import { type ForecastItem } from "../types/weather";

type Props = {
  forecast: ForecastItem[];
};
export default function ForecastList({ forecast }: Props) {
  return (
    <div className="forecast">
      {forecast.map((day) => {
        const date = new Date(day.dt * 1000);

        return (
          <div key={day.dt} className="forecast-card">
            <p>{date.toLocaleDateString("ru-RU", { weekday: "short" })}</p>
            <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="" />
            <h3>{Math.round(day.main.temp)}°</h3>
          </div>
        );
      })}
    </div>
  );
}
