import { memo } from "react";
import WeatherCard from "./WeatherCard";
import Forecast from "./Forecast";
import { useWeatherSettings } from "../../../context/WeatherContext";
import { formatLocalTime } from "../../../utils/format";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Droplets, Eye, Thermometer, Sunrise, Sunset, Gauge, Cloudy } from "lucide-react";

const WeatherDisplay = ({ data, forecast }) => {
  const { unit } = useWeatherSettings();

  if (!data) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={data.name}
        variants={container}
        initial="hidden"
        animate="show"
        className="dashboard-grid"
      >
        {/* Main Weather Tile */}
        <motion.div variants={item} className="bento-tile main-area">
          <WeatherCard data={data} unit={unit} isBentoMain={true} />
        </motion.div>

        {/* Sunrise & Sunset Tile (Wide) */}
        <motion.div variants={item} className="bento-tile sun-area">
          <div className="sun-tile-container">
            <div className="sun-item">
              <Sunrise size={20} color="var(--accent-primary)" strokeWidth={1.5} />
              <label>Sunrise</label>
              <span>{formatLocalTime(data.sys.sunrise, data.timezone)}</span>
            </div>
            <div className="sun-item">
              <Sunset size={20} color="var(--accent-primary)" strokeWidth={1.5} />
              <label>Sunset</label>
              <span>{formatLocalTime(data.sys.sunset, data.timezone)}</span>
            </div>
          </div>
        </motion.div>

        {/* Pressure Tile */}
        <motion.div variants={item} className="bento-tile pressure-area metric-tile">
          <Gauge size={24} color="var(--accent-primary)" strokeWidth={1.5} />
           <strong>Pressure</strong>
          <span>{data.main.pressure} <small style={{fontSize: '0.6rem'}}>hPa</small></span>
        </motion.div>

        {/* Cloud Coverage Tile */}
        <motion.div variants={item} className="bento-tile cloud-area metric-tile">
          <Cloudy size={24} color="var(--accent-primary)" strokeWidth={1.5} />
          <strong>Clouds</strong>
          <span>{data.clouds.all}%</span>
        </motion.div>

        {/* Standard Metric tiles */}
        <motion.div variants={item} className="bento-tile m1-area metric-tile">
          <Droplets size={24} color="var(--accent-primary)" strokeWidth={1.5} />
          <strong>Humidity</strong>
          <span>{data.main.humidity}%</span>
        </motion.div>

        <motion.div variants={item} className="bento-tile m2-area metric-tile">
          <Wind size={24} color="var(--accent-primary)" strokeWidth={1.5} />
          <strong>Wind</strong>
          <span>{data.wind.speed} {unit === "metric" ? "m/s" : "mph"}</span>
        </motion.div>

        <motion.div variants={item} className="bento-tile m3-area metric-tile">
          <Thermometer size={24} color="var(--accent-primary)" strokeWidth={1.5} />
          <strong>Feels Like</strong>
          <span>{Math.round(data.main.feels_like)}°</span>
        </motion.div>

        <motion.div variants={item} className="bento-tile m4-area metric-tile">
          <Eye size={24} color="var(--accent-primary)" strokeWidth={1.5} />
          <strong>Visibility</strong>
          <span>{(data.visibility / 1000).toFixed(1)} km</span>
        </motion.div>

        {/* Forecast Tile (Wide) */}
        <motion.div variants={item} className="bento-tile forecast-area">
          <Forecast items={forecast} unit={unit} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(WeatherDisplay);
