import { memo } from "react";
import { WEATHER_CONFIG } from "../../../constants/config";
import { motion } from "framer-motion";

const Forecast = ({ items }) => {
  if (!items) return null;

  return (
    <div className="forecast-section">
      <h3>5-Day Forecast</h3>
      <div className="forecast-list">
        {items.map((item, index) => {
          const date = new Date(item.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short",
          });
          const iconUrl = `${WEATHER_CONFIG.ICON_BASE_URL}/${item.weather[0].icon}.png`;

          return (
            <motion.div 
              key={item.dt} 
              className="forecast-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <span className="forecast-day">{date}</span>
              <img src={iconUrl} alt={item.weather[0].main} />
              <span className="forecast-temp">
                {Math.round(item.main.temp)}°
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Forecast);
