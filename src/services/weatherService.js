import { WEATHER_CONFIG } from "../constants/config";

const { BASE_URL, API_KEY } = WEATHER_CONFIG;

export const weatherService = {
  /**
   * Fetch current weather by city name
   */
  async getCurrentWeather(city, unit = "metric") {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`
      );
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Fetch current weather by geographic coordinates
   */
  async getWeatherByCoords(lat, lon, unit = "metric") {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
      );
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Fetch 5-day forecast (Scalability Improvement)
   */
  async getForecast(city, unit = "metric") {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`
      );
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.json();
      const message = errorData.message || "An error occurred while fetching weather data.";
      
      if (response.status === 404) throw new Error("City not found");
      if (response.status === 429) throw new Error("API limit exceeded. Please try again later.");
      if (response.status === 401) throw new Error("Invalid API key. Check your configuration.");
      
      throw new Error(message);
    }
    return response.json();
  },

  handleError(error) {
    console.error("Weather Service Error:", error);
    if (error.name === "TypeError") {
      return new Error("Network error. Please check your connection.");
    }
    return error;
  }
};
