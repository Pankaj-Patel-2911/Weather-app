import React from "react";
import { Sun, CloudRain, CloudSnow, Zap, Cloud } from "lucide-react";

const WeatherDisplayCard = ({ data }) => {
  const getWeatherIcon = (main) => {
    switch (main) {
      case "Rain":
        return <CloudRain className="w-16 h-16 text-blue-400" />;
      case "Thunderstorm":
        return <Zap className="w-16 h-16 text-yellow-500" />;
      case "Snow":
        return <CloudSnow className="w-16 h-16 text-gray-300" />;
      case "Clouds":
        return <Cloud className="w-16 h-16 text-gray-400" />;
      case "Clear":
        return <Sun className="w-16 h-16 text-yellow-300" />;
      default:
        return <Cloud className="w-16 h-16 text-gray-400" />;
    }
  };

  if (!data) return null;

  const { name, main: temp, weather, wind, sys, state, coord } = data;
  const main = weather[0].main;
  const pressure = temp.pressure;
  const lat = coord.lat;
  const lon = coord.lon;

  return (
    <div className="bg-white bg-opacity-20 p-6 rounded-xl shadow-lg backdrop-blur-sm text-center text-gray-800 w-72 max-w-xs mx-auto mt-6 border border-white border-opacity-30 transform transition-all duration-300 hover:scale-105">
      {" "}
      {/* Removed flex-grow and adjusted mt-6 */}
      <h2 className="text-3xl font-bold mb-2">
        {name}
        {state && `, ${state}`}
        {sys.country && `, ${sys.country}`}
      </h2>
      <div className="my-4 flex justify-center items-center">
        {getWeatherIcon(main)}
      </div>
      <p className="text-5xl font-semibold mb-2">{Math.round(temp.temp)}°C</p>
      <p className="capitalize text-xl mb-4">{weather[0].description}</p>
      <div className="grid grid-cols-2 gap-4 text-lg mt-4 border-t border-white border-opacity-30 pt-4">
        <div>
          <p className="font-medium">Humidity</p>
          <p>{temp.humidity}%</p>
        </div>
        <div>
          <p className="font-medium">Wind Speed</p>
          <p>{wind.speed} m/s</p>
        </div>
        <div>
          <p className="font-medium">Pressure</p>
          <p>{pressure} hPa</p>
        </div>
        <div>
          <p className="font-medium">Coordinates</p>
          <p>
            {lat.toFixed(2)}, {lon.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplayCard;
