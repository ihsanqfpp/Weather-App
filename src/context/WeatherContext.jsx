import { createContext, useContext, useState, useEffect } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import { STORAGE_KEYS } from "../constants/config";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [unit, setUnit] = useState(() => loadFromStorage(STORAGE_KEYS.UNIT, "metric"));
  const [history, setHistory] = useState(() => loadFromStorage(STORAGE_KEYS.SEARCH_HISTORY, []));
  const [lastCity, setLastCity] = useState(() => loadFromStorage(STORAGE_KEYS.LAST_CITY, ""));

  // Persist state changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.UNIT, unit);
  }, [unit]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SEARCH_HISTORY, history);
  }, [history]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.LAST_CITY, lastCity);
  }, [lastCity]);

  const toggleUnit = () => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  const addToHistory = (city) => {
    if (!city) return;
    setHistory((prev) => {
      const updated = [city, ...prev.filter((c) => c.toLowerCase() !== city.toLowerCase())];
      return updated.slice(0, 5); // Keep last 5 searches
    });
    setLastCity(city);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <WeatherContext.Provider
      value={{
        unit,
        history,
        lastCity,
        toggleUnit,
        addToHistory,
        clearHistory,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherSettings = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherSettings must be used within a WeatherProvider");
  }
  return context;
};
