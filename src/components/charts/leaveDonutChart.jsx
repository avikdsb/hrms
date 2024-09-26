import React from "react";
import Chart from "react-apexcharts";
import { leaveChartLabels, leaveChartSeries } from "../../constants/chartData";
import { color, width } from "@mui/system";
import { colors } from "@mui/material";

const LeaveDonutChart = () => {
  const totalLeave = 20; // Total leave allocation
  const totalUsedLeave = Array.isArray(leaveChartSeries)
    ? leaveChartSeries.reduce((a, b) => a + (b || 0), 0)
    : 0; // Safely sum the leaveChartSeries values
  const remainingLeave = totalLeave - totalUsedLeave;

  // Make sure the series is an array and contains valid numbers
  const updatedSeries =
    Array.isArray(leaveChartSeries) && leaveChartSeries.length
      ? [...leaveChartSeries.map((num) => num || 0), remainingLeave]
      : [remainingLeave];

  // Make sure labels are properly defined as an array of strings
  const updatedLabels =
    Array.isArray(leaveChartLabels) && leaveChartLabels.length
      ? [...leaveChartLabels, "Remaining Leave"]
      : ["Remaining Leave"];

  // Define the chart options with safe defaults
  const chartOptions = {
    chart: {
      type: "donut",
    },
    labels: updatedLabels,
    legend: {
      position: "right",
      labels: {
        colors: "##cfcfcf",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
    stroke: {
      show: false,
      width: 0,
      gap: 2,
    },
    colors: ["#e7ceb5", "#dfbe9c", "#d7ae83", "#ac8b69", "#564634"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        // shadeIntensity: 0.5,
        // gradientToColors: [
        //   "#111111",
        //   "#0e0e0e",
        //   "#777777",
        //   "#0e0e0e",
        //   "#0e0e0e",
        // ],
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="flex justify-center w-full mx-auto">
      {updatedSeries && updatedLabels && (
        <Chart
          options={chartOptions}
          series={updatedSeries}
          type="donut"
          height={400}
          width={400}
        />
      )}
    </div>
  );
};

export default LeaveDonutChart;

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

// black: {
//           100: "#cfcfcf",
//           200: "#a0a0a0",
//           300: "#707070",
//           400: "#414141",
//           500: "#111111",
//           600: "#0e0e0e",
//           700: "#0a0a0a",
//           800: "#070707",
//           900: "#030303"
// },
