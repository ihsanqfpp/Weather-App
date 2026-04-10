import { useWeather } from "./features/weather/hooks/useWeather";
import SearchBar from "./features/weather/components/SearchBar";
import WeatherDisplay from "./features/weather/components/WeatherDisplay";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import WeatherAnimation from "./features/weather/components/WeatherAnimation";
import CloudAnimation from "./features/weather/components/CloudAnimation";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

function App() {
  const { 
    data, 
    forecast,
    loading, 
    error, 
    background, 
    fetchWeather, 
    fetchByLocation 
  } = useWeather();

  const weatherMain = data?.weather[0]?.main;

  return (
    <div className={`app-container ${background}`}>
      <CloudAnimation show={weatherMain === "Clouds"} />
      <WeatherAnimation type={weatherMain} />

      <motion.div 
        className="dashboard-wrapper"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <header className="header-area">
          <h1>SkyCast Pro</h1>
        </header>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="loader-full"
            >
              <Loader />
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="error-container"
            >
              <div className="bento-tile search-area">
                <SearchBar onSearch={fetchWeather} onSetLocation={fetchByLocation} />
              </div>
              <ErrorMessage message={error} />
            </motion.div>
          ) : data ? (
            <div className="dashboard-content">
              <div className="bento-tile search-area">
                <SearchBar onSearch={fetchWeather} onSetLocation={fetchByLocation} />
              </div>
              <WeatherDisplay data={data} forecast={forecast} />
            </div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="empty-dashboard"
            >
              <div className="bento-tile search-area hero-search">
                <h2>Ready for the forecast?</h2>
                <SearchBar onSearch={fetchWeather} onSetLocation={fetchByLocation} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
