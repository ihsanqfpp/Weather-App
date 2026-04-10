import { memo } from "react";
import { WEATHER_CONFIG } from "../../../constants/config";
import { motion } from "framer-motion";

function WeatherCard({ data, unit }) {
  const iconUrl = `${WEATHER_CONFIG.ICON_BASE_URL}/${data.weather[0].icon}@4x.png`;

  return (
    <div className="weather-card-bento">
      <motion.div 
        className="weather-icon-bento"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img 
          src={iconUrl} 
          alt={data.weather[0].description} 
        />
      </motion.div>
      <p className="temp">{Math.round(data.main.temp)}°</p>
      <h2>{data.name}</h2>
      <p className="description">{data.weather[0].main}</p>
    </div>
  );
}

export default memo(WeatherCard);
