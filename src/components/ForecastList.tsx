import { type ForecastItem } from "../types/weather";
import { motion, type Variants } from "framer-motion";

type Props = {
  forecast: ForecastItem[];
};

const containerVariants: Variants = {
  // <-- Указываем тип
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  // <-- Указываем тип
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function ForecastList({ forecast }: Props) {
  return (
    <motion.div
      className="forecast"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {forecast.map((day) => {
        const date = new Date(day.dt * 1000);

        return (
          <motion.div
            key={day.dt}
            className="forecast-card"
            variants={itemVariants}
          >
            <p className="forecast-day">
              {date.toLocaleDateString("ru-RU", { weekday: "short" })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt=""
            />
            <h3 className="forecast-temp">{Math.round(day.main.temp)}°</h3>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
