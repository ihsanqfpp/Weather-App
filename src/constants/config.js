export const WEATHER_CONFIG = {
  API_KEY: import.meta.env.VITE_WEATHER_API_KEY,
  BASE_URL: import.meta.env.VITE_WEATHER_BASE_URL,
  ICON_BASE_URL: import.meta.env.VITE_WEATHER_ICON_URL,
};

export const WEATHER_CONDITIONS = {
  Clear: "clear",
  Clouds: "clouds",
  Rain: "rain",
  Drizzle: "rain",
  Snow: "snow",
  Thunderstorm: "storm",
};

export const STORAGE_KEYS = {
  SEARCH_HISTORY: "weather_search_history",
  UNIT: "weather_unit",
  LAST_CITY: "weather_last_city",
};
