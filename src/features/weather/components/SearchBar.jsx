import { useState, memo } from "react";
import { useWeatherSettings } from "../../../context/WeatherContext";
import { Search, MapPin, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = ({ onSearch, onSetLocation }) => {
  const [city, setCity] = useState("");
  const { history, clearHistory, unit, toggleUnit } = useWeatherSettings();

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-section-bento">
      <div className="search-box">
        <input
          placeholder="Explore cities..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          aria-label="City name"
        />
        <button onClick={handleSearch} aria-label="Search city">
          <Search size={18} />
        </button>
      </div>

      <button className="unit-toggle-compact" onClick={toggleUnit} title="Toggle Units">
        {unit === "metric" ? "°C" : "°F"}
      </button>

      <button className="location-btn" onClick={onSetLocation}>
        <MapPin size={16} />
        Current
      </button>

      <AnimatePresence>
        {history.length > 0 && (
          <motion.div 
            className="history-bento"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="history-header">
              <p>Recent</p>
              <button onClick={clearHistory} className="clear-btn">
                <Trash2 size={12} />
              </button>
            </div>
            <div className="history-list">
              {history.map((item, i) => (
                <button 
                  key={`${item}-${i}`} 
                  onClick={() => onSearch(item)}
                  className="history-pill"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(SearchBar);
