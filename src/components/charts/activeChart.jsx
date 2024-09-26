import React, { useState, useEffect } from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { dailyEmployeeActivity } from "../../constants/chartData";

const settings = {
  startAngle: -110,
  endAngle: 110,
  width: 300,
  height: 200,
};

export default function DailyActiveEmployees() {
  const [activeEmployees, setActiveEmployees] = useState(0);
  const [displayValue, setDisplayValue] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {
    const fetchEmployeeData = () => {
      const { activeEmployees, totalEmployees } = dailyEmployeeActivity();
      setActiveEmployees(activeEmployees);
      setTotalEmployees(totalEmployees);
    };

    fetchEmployeeData();
  }, []);

  useEffect(() => {
    if (activeEmployees > 0) {
      let currentValue = 0;
      const step = () => {
        currentValue += 1;
        setDisplayValue(currentValue);
        if (currentValue < activeEmployees) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
  }, [activeEmployees]);

  return (
    <div>
      <Gauge
        {...settings}
        value={displayValue}
        valueMax={totalEmployees}
        innerRadius="80%"
        outerRadius="100%"
        cornerRadius="50%"
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 30,
            transform: "translate(0px, 0px)",
          },
          [`& .${gaugeClasses.valueArc}`]: {
            // fill: "#D7AE83",
            fill: "url(#gaugeGradient)",
          },
          [`& .${gaugeClasses.valueText} text`]: {
            fill: "#D7AE83",
            fontWeight: "600",
          },
        }}
        text={({ value, valueMax }) => `${value} / ${valueMax}`}
        style={{ width: "100%", height: "100%" }}
      />

      <svg width={0} height={0}>
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#564634" />
            <stop offset="100%" stopColor="#d7ae83" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// gray: {
//     100: "#f7efe6",
//     200: "#efdfcd",
//     300: "#e7ceb5",
//     400: "#dfbe9c",
//     500: "#d7ae83",
//     600: "#ac8b69",
//     700: "#81684f",
//     800: "#564634",
//     900: "#2b231a"
// },
