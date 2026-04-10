import { memo } from "react";

function WeatherAnimation({ type }) {
  if (type === "Rain") {
    return <div className="rain">{Array(60).fill().map((_, i) => <span key={i}></span>)}</div>;
  }

  if (type === "Snow") {
    return <div className="snow">{Array(40).fill().map((_, i) => <span key={i}></span>)}</div>;
  }

  return null;
}

export default memo(WeatherAnimation);
