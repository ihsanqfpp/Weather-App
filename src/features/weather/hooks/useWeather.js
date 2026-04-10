import { useState, useCallback, useEffect } from "react";
import { weatherService } from "../../../services/weatherService";
import { useWeatherSettings } from "../../../context/WeatherContext";
import { WEATHER_CONDITIONS } from "../../../constants/config";

export const useWeather = () => {
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [background, setBackground] = useState("default");
  
  const { unit, addToHistory, lastCity } = useWeatherSettings();

  const updateBackground = useCallback((condition) => {
    setBackground(WEATHER_CONDITIONS[condition] || "default");
  }, []);

  const fetchWeather = useCallback(async (searchParams) => {
    setLoading(true);
    setError("");
    
    try {
      let result;
      let forecastResult;
      
      if (typeof searchParams === "string") {
        result = await weatherService.getCurrentWeather(searchParams, unit);
        forecastResult = await weatherService.getForecast(searchParams, unit);
        addToHistory(result.name);
      } else if (searchParams.lat && searchParams.lon) {
        result = await weatherService.getWeatherByCoords(searchParams.lat, searchParams.lon, unit);
        // Forecasting by coords (using result.name for simplicity or could be refined)
        forecastResult = await weatherService.getForecast(result.name, unit);
        if (result.name) addToHistory(result.name);
      }

      setData(result);
      setForecast(processForecast(forecastResult));
      updateBackground(result.weather[0].main);
    } catch (err) {
      setError(err.message);
      setData(null);
      setForecast(null);
      setBackground("default");
    } finally {
      setLoading(false);
    }
  }, [unit, addToHistory, updateBackground]);

  // Helper to group daily forecast
  const processForecast = (raw) => {
    if (!raw || !raw.list) return null;
    // OpenWeather 5day/3hr returns 40 items. We want ~1 per day.
    const daily = raw.list.filter((_, index) => index % 8 === 0).slice(0, 5);
    return daily;
  };

  const fetchByLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => {
        setError("Location access denied.");
        setLoading(false);
      }
    );
  }, [fetchWeather]);

  useEffect(() => {
    if (lastCity && !data && !loading && !error) {
      fetchWeather(lastCity);
    }
  }, []);

  return {
    data,
    forecast,
    loading,
    error,
    background,
    fetchWeather,
    fetchByLocation
  };
};
