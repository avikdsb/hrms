import React, { useState, useEffect, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { polarChartData } from "../../constants/chartData";

const PolarChart = () => {
  const categories = useMemo(
    () => polarChartData.map((data) => data.category),
    []
  );

  const values = useMemo(() => polarChartData.map((data) => data.value), []);

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    setSeries(values);
    setOptions({
      chart: {
        type: "polarArea",
        // Moves the chart down to create more space at the top
        offsetY: 10,
        // Moves the chart to the right to create more space on the left
        // offsetX: 20,
      },

      labels: categories,
      stroke: {
        show: false,
      },
      fill: {
        opacity: 0.8,
      },
      colors: [
        "#ffc385",
        "#f5c695",
        "#f9ddbf",
        "#cfc3b8",
        "#868686",
        "#cc5454",
      ],

      // Control the appearance of circular borders (rings)
      plotOptions: {
        polarArea: {
          rings: {
            // Circular borders (rings) style
            strokeWidth: 1,
            strokeColor: "#363636",
          },
          spokes: {
            // Styles of the spokes (lines from the center to the edge)
            strokeWidth: 1,
            connectorColors: "#363636",
          },
        },
      },

      // Axis settings to change the tick label colors
      // (number colors on the border)
      yaxis: {
        show: true,
        labels: {
          style: {
            colors: "#EDF6FF",
            fontSize: "0.7rem",
          },
        },
      },

      // Color for legend labels
      legend: {
        labels: {
          colors: "#EDF6FF",
          fontSize: "12px",
        },
        // Style of the legend marker
        markers: {
          width: 10,
          height: 10,
          strokeColor: "#111111",
          strokeWidth: 1,
          // Shape of the legend marker
          shape: "square",
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
        position: "bottom",
      },

      // Color for data labels
      dataLabels: {
        style: {
          colors: ["#EDF6FF"],
        },
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    });
  }, [categories, values]);

  return (
    <div id="chart" style={{ color: "#EDF6FF" }}>
      {series.length > 0 && options.labels ? (
        <ReactApexChart
          options={options}
          series={series}
          type="polarArea"
          height={350}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default PolarChart;
