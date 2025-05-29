import React from "react";
import { Sun, CloudRain, CloudSnow, Zap, Cloud } from "lucide-react";

/**
 * DailyForecastCard component to display a single day's weather forecast.
 * @param {object} props - Component props.
 * @param {object} props.day - A single daily forecast object from OpenWeatherMap One Call API.
 */
const DailyForecastCard = ({ day }) => {
  // Convert Unix timestamp to a readable date string (e.g., "Mon, May 29")
  const date = new Date(day.dt * 1000).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  // Get the appropriate Lucide icon based on weather main description
  const getWeatherIcon = (main) => {
    switch (main) {
      case "Rain":
        return <CloudRain className="w-10 h-10 text-blue-400" />; // Slightly larger icon
      case "Thunderstorm":
        return <Zap className="w-10 h-10 text-yellow-500" />;
      case "Snow":
        return <CloudSnow className="w-10 h-10 text-gray-300" />;
      case "Clouds":
        return <Cloud className="w-10 h-10 text-gray-400" />;
      case "Clear":
        return <Sun className="w-10 h-10 text-yellow-300" />;
      case "Drizzle":
        return <CloudRain className="w-10 h-10 text-blue-300" />;
      case "Mist":
      case "Fog":
      case "Haze":
        return <Cloud className="w-10 h-10 text-gray-400" />;
      default:
        return <Cloud className="w-10 h-10 text-gray-400" />;
    }
  };

  if (!day) return null; // Don't render if no day data

  return (
    <div
      className="flex flex-col items-center
      bg-white bg-opacity-20 p-5 rounded-xl shadow-lg backdrop-blur-sm
      border border-white border-opacity-30
      transform transition-all duration-300 hover:scale-105
      min-w-[130px] max-w-[150px] flex-grow basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
    >
      <p className="font-semibold text-lg mb-2">{date}</p>
      <div className="my-2">{getWeatherIcon(day.weather[0].main)}</div>
      {/* Main daily temperature */}
      <p className="text-3xl font-bold mb-1">{Math.round(day.temp.day)}°C</p>
      {/* Min/Max temperatures */}
      <p className="text-sm">
        <span className="font-medium">Min:</span> {Math.round(day.temp.min)}°C
      </p>
      <p className="text-sm">
        <span className="font-medium">Max:</span> {Math.round(day.temp.max)}°C
      </p>
      <p className="capitalize text-sm mt-2 text-center text-gray-800">
        {day.weather[0].description}
      </p>
    </div>
  );
};

export default DailyForecastCard;
