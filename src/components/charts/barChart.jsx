import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { employeeData } from "../../constants/employeeData"; // Your employee data file
import { Box, FormControl, MenuItem, Select } from "@mui/material";

const EmployeeChart = () => {
  const [period, setPeriod] = useState("1Y"); // Default to 6 months

  // Function to filter employees based on selected time period
  const filterDataByPeriod = (data, period) => {
    const now = new Date();
    let startDate;

    // Set the start date based on the selected period
    switch (period) {
      case "1M":
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "3M":
        startDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case "6M":
        startDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case "1Y":
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date();
    }

    // Return employees whose joining date (doj) is within the selected period
    return data.filter((employee) => new Date(employee.doj) >= startDate);
  };

  // Function to categorize employees based on their status
  const categorizeEmployeeData = (data) => {
    const now = new Date();
    const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
    const categorizedData = { new: 0, active: 0, resigned: 0 };

    data.forEach((employee) => {
      const joiningDate = new Date(employee.doj);

      // New employee if they joined in the last 6 months and are Active
      if (joiningDate >= sixMonthsAgo && employee.status === "Active") {
        categorizedData.new += 1;
      }

      // Active employees
      if (employee.status === "Active") {
        categorizedData.active += 1;
      }

      // Resigned (Inactive) employees
      if (employee.status === "Inactive") {
        categorizedData.resigned += 1;
      }
    });

    return categorizedData;
  };

  // Filter the employee data based on the selected period
  const filteredData = filterDataByPeriod(employeeData, period);

  // Categorize the filtered employee data
  const counts = categorizeEmployeeData(filteredData);

  // ApexCharts options
  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
        export: {
          csv: {
            filename: "employee-data",
          },
          png: {
            filename: "employee-data",
          },
          svg: {
            filename: "employee-data",
          },
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "20%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
      color: "#EDF6FF",
    },
    xaxis: {
      categories: ["New", "Active", "Resigned"],
      labels: {
        style: {
          colors: "#EDF6FF",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Number of Employees",
        style: {
          color: "#EDF6FF",
          fontSize: "12px",
        },
      },
      labels: {
        style: {
          colors: "#D7AE83",
          fontSize: "12px",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      style: {
        fontSize: "12px",
        color: "#EDF6FF",
      },
      onDatasetHover: {
        highlightDataSeries: true,
      },
      y: {
        formatter: function (val) {
          return `${val}`;
        },
      },
      theme: "dark",
      marker: {
        show: true,
      },
    },
    colors: ["#D7AE83"],
  };

  // Chart series
  const chartSeries = [
    {
      name: "Employees",
      data: [counts.new, counts.active, counts.resigned],
    },
  ];

  return (
    <Box className="flex relative">
      <Box className="absolute top-[-20px] right-[0px] z-10">
        <FormControl size="small">
          <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            displayEmpty
            sx={{
              minWidth: 50,
              color: "#edf6ff",
              backgroundColor: "#282828",
              borderRadius: "0.5rem",
              borderWidth: "0.1rem",
              borderColor: "#D7AE83",
              outline: "none",

              ".MuiSelect-icon": {
                color: "#999999",
              },
              "&::before": {
                borderBottom: "none",
              },
              "&::after": {
                borderBottom: "none",
              },
              "&:hover:not(.Mui-disabled)::before": {
                borderBottom: "none",
              },
            }}
            MenuProps={{
              PaperProps: {
                // Dropdown panel style
                sx: {
                  bgcolor: "#282828",
                  "& .MuiMenuItem-root": {
                    color: "#EDF6FF",
                    "&:hover": {
                      bgcolor: "#D7AE83",
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value="1M">1M</MenuItem>
            <MenuItem value="3M">3M</MenuItem>
            <MenuItem value="6M">6M</MenuItem>
            <MenuItem value="1Y">1Y</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Bar chart */}
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={300}
        width="100%"
      />
    </Box>
  );
};

export default EmployeeChart;
