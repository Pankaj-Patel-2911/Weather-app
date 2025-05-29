import React, { useState, useEffect } from "react";
import WeatherBackground from "./WeatherBackground";
import Button from "./Button";
import WeatherDisplayCard from "./WeatherDisplayCard";
import AqiDisplayCard from "./AqiDisplayCard";
import WeatherMap from "./WeatherMap";

function WeatherApp() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [aqiData, setAqiData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    if (initialLoad) {
      setMapCoordinates({ lat: 23.2599, lon: 77.4126 });
      setInitialLoad(false);
    }
  }, [initialLoad]);

  const fetchWeatherAndAqiByCoordinates = async (lat, lon) => {
    setLoading(true);
    setError("");
    setWeatherData(null);
    setAqiData(null);

    try {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
      );

      if (!geoRes.ok) {
        throw new Error(
          "Could not find location details (reverse geocoding failed)."
        );
      }
      const geoData = await geoRes.json();
      const cityName =
        geoData.length > 0 ? geoData[0].name : "Selected Location";
      const foundState = geoData.length > 0 ? geoData[0].state : "";

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );

      if (!weatherRes.ok) {
        if (weatherRes.status === 401) {
          throw new Error("Invalid API key. Please check your API key.");
        }
        throw new Error(`Failed to fetch weather: ${weatherRes.statusText}`);
      }

      const weatherJson = await weatherRes.json();
      const finalWeatherData = {
        ...weatherJson,
        name: cityName,
        state: foundState,
      };

      setWeatherData(finalWeatherData);
      setError("");

      const aqiRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );

      if (!aqiRes.ok) {
        console.warn("Could not fetch AQI data for this location.");
        setAqiData(null);
      } else {
        const aqiJson = await aqiRes.json();
        setAqiData(aqiJson);
      }
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError(err.message);
      setWeatherData(null);
      setAqiData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherAndAqiByCityName = async () => {
    if (!location.trim()) {
      setError("Please enter a city");
      setWeatherData(null);
      setAqiData(null);
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);
    setAqiData(null);

    try {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`
      );

      if (!geoRes.ok) {
        throw new Error("Could not find location details (geocoding failed).");
      }
      const geoData = await geoRes.json();

      if (geoData.length === 0) {
        throw new Error("City not found. Please check the spelling.");
      }

      const { lat, lon, name: foundCityName, state: foundState } = geoData[0];

      setMapCoordinates({ lat, lon });

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );

      if (!weatherRes.ok) {
        if (weatherRes.status === 401) {
          throw new Error("Invalid API key. Please check your API key.");
        }
        throw new Error(`Failed to fetch weather: ${weatherRes.statusText}`);
      }

      const weatherJson = await weatherRes.json();
      const finalWeatherData = {
        ...weatherJson,
        name: foundCityName,
        state: foundState,
      };

      setWeatherData(finalWeatherData);
      setError("");

      const aqiRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );

      if (!aqiRes.ok) {
        console.warn("Could not fetch AQI data for this location.");
        setAqiData(null);
      } else {
        const aqiJson = await aqiRes.json();
        setAqiData(aqiJson);
      }
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError(err.message);
      setWeatherData(null);
      setAqiData(null);
      setMapCoordinates(null);
    } finally {
      setLoading(false);
    }
  };

  const handleMapClick = (lat, lon) => {
    setLocation("");
    setMapCoordinates({ lat, lon });
  };

  useEffect(() => {
    if (mapCoordinates && !initialLoad) {
      fetchWeatherAndAqiByCoordinates(mapCoordinates.lat, mapCoordinates.lon);
    }
  }, [mapCoordinates, initialLoad]);

  const getOverallBackgroundGradient = () => {
    if (!weatherData) return "from-blue-400 to-sky-600";
    const main = weatherData.weather[0].main;
    switch (main) {
      case "Rain":
        return "from-gray-700 to-blue-900";
      case "Thunderstorm":
        return "from-gray-800 to-gray-900";
      case "Snow":
        return "from-blue-200 to-white";
      case "Clear":
        return "from-blue-300 to-sky-500";
      case "Clouds":
        return "from-gray-500 to-blue-700";
      default:
        return "from-blue-400 to-sky-600";
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center relative overflow-x-hidden
        bg-gradient-to-br ${getOverallBackgroundGradient()} transition-all duration-1000 ease-in-out
        font-inter text-white`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <WeatherBackground weatherData={weatherData} />

      <div className="relative z-10 flex flex-col items-center p-4 w-full max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-white mb-6 flex items-center gap-3 drop-shadow-lg">
          <span className="text-4xl animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-cloud-sun"
            >
              <path d="M12 2v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="M20 12h2" />
              <path d="m19.07 4.93-1.41 1.41" />
              <path d="M15.947 12.65a4 4 0 0 0-5.925-4.122A4.5 4.5 0 0 0 7 18h9a3 3 0 0 0 0-6.25" />
            </svg>
          </span>
          Weather Dashboard
        </h1>
        <div className="w-full flex flex-col items-center gap-4 max-w-md mb-6">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchWeatherAndAqiByCityName();
            }}
            placeholder="Enter city name, e.g., London"
            className="px-5 py-3 rounded-full shadow-lg bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-lg"
          />
          <Button onClick={fetchWeatherAndAqiByCityName}>
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Fetching...
              </span>
            ) : (
              "Get Weather"
            )}
          </Button>
        </div>
        {error && (
          <p className="text-red-300 mt-4 p-3 bg-red-800 bg-opacity-50 rounded-lg shadow-md text-center">
            {error}
          </p>
        )}

        {weatherData ? (
          <div className="flex flex-col lg:flex-row justify-center items-start gap-6 w-full mt-8">
            <div className="flex flex-col md:flex-row justify-center items-start gap-6 w-full lg:w-1/2">
              <WeatherDisplayCard data={weatherData} />
              {aqiData && <AqiDisplayCard aqiData={aqiData} />}
            </div>

            <div className="w-full lg:w-1/2 min-h-[400px]">
              <WeatherMap
                lat={mapCoordinates?.lat}
                lon={mapCoordinates?.lon}
                city={weatherData?.name}
                onMapClick={handleMapClick}
              />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto min-h-[500px] mt-8 flex justify-center items-center">
            {mapCoordinates && (
              <WeatherMap
                lat={mapCoordinates.lat}
                lon={mapCoordinates.lon}
                city="Bhopal"
                onMapClick={handleMapClick}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
