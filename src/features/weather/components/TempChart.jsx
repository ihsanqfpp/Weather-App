import { memo } from "react";
import { motion } from "framer-motion";

const TempChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  const width = 300;
  const height = 100;
  const padding = 20;

  // Calculate scales
  const temps = data.map(item => item.main.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const range = maxTemp - minTemp || 1;

  const points = data.map((item, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - ((item.main.temp - minTemp) / range) * (height - padding * 2) - padding;
    return { x, y, temp: item.main.temp };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <div className="temp-chart-container">
      <svg viewBox={`0 0 ${width} ${height}`} className="temp-chart-svg">
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Area Fill */}
        <motion.path
          d={`${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`}
          fill="url(#chartGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* The Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="var(--accent-primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Data Points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="white"
            stroke="var(--accent-primary)"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 + i * 0.1 }}
            whileHover={{ scale: 2 }}
          />
        ))}
      </svg>
      <div className="chart-labels">
        {data.map((item, i) => (
          <span key={i} className="chart-label">
            {new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}
          </span>
        ))}
      </div>
    </div>
  );
};

export default memo(TempChart);
