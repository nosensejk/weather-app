export interface WeatherData {
   name: string,
   main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
   };
   weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
   }[];
   wind: {
      speed: number;
   };
}

export interface ForecastItem {
   dt: number;
   main: {
      temp: number;
   };
   weather: {
      icon: string;
      description: string;
   }[];
   dt_txt: string;
}

export interface ForecastData {
   list: ForecastItem[];
}