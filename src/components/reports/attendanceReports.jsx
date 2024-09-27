import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import "jspdf-autotable";
import { attendanceData } from "../../constants/employeeData";
import DateRangePicker from "./datePickerFilter";
import "../components.css";

const currentYear = dayjs().year();

function CustomToolbar({
  filters,
  handleFilterChange,
  handleDateChange,
  applyFilters,
  clearFilters,
  handleExportExcel,
  handleExportPdf,
}) {
  // Initialize state from localStorage or default to false
  const [showFilters, setShowFilters] = useState(() => {
    const storedState = localStorage.getItem("showFilters");
    return storedState === null ? false : JSON.parse(storedState);
  });

  // Update localStorage whenever showFilters changes
  useEffect(() => {
    localStorage.setItem("showFilters", JSON.stringify(showFilters));
  }, [showFilters]);

  // Function to toggle filter visibility
  const toggleFilters = () => {
    setShowFilters((prevState) => !prevState);
  };

  return (
    <GridToolbarContainer>
      <div>
        <div className="flex flex-row justify-end items-start gap-[0.5rem] px-[0rem] py-[0rem]">
          <GridToolbarColumnsButton
            slotProps={{
              tooltip: { title: "Filter Columns" },
              button: {
                variant: "outlined",
                sx: {
                  color: "#D7AE83",
                  backgroundColor: "#111111",
                  fontSize: "12px",
                  fontWeight: "500",
                  border: "1px solid #111111",
                  borderRadius: "5px",
                  padding: "6px 12px",
                  "&:hover": {
                    color: "#EDF6FF",
                    border: "1px solid #111111",
                  },
                },
              },
            }}
          />
          {/* Apply Filters Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={toggleFilters}
            sx={{
              color: "#D7AE83",
              backgroundColor: "#111111",
              fontSize: "12px",
              fontWeight: "500",
              border: "1px solid #111111",
              borderRadius: "5px",
              padding: "6px 12px",
              "&:hover": {
                color: "#EDF6FF",
                border: "1px solid #111111",
              },
            }}
          >
            {showFilters ? "Hide Filters" : "Apply Filters"}
          </Button>

          {/* Buttons Section */}
          <Box
            sx={{
              fontSize: "1rem",
              borderRadius: "5px",
              overflow: "hidden",
              gap: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 0,
              cursor: "pointer",
            }}
          >
            <GridToolbarExport
              printOptions={{
                // Export all columns including hidden or truncated ones
                allColumns: true,
                hideFooter: false,
                hideToolbar: true,
              }}
              csvOptions={{
                // Ensures all columns are included in CSV export
                allColumns: true,
                // Optional: you can customize the delimiter for CSV
                delimiter: ",",
                // Ensure proper encoding if your data contains special characters
                utf8WithBom: true,
              }}
              slotProps={{
                tooltip: { title: "Export data" },
                button: {
                  variant: "outlined",
                  sx: {
                    color: "#D7AE83",
                    backgroundColor: "#111111",
                    fontSize: "12px",
                    fontWeight: "500",
                    border: "1px solid #111111",
                    borderRadius: "5px",
                    padding: "6px 12px",
                    "&:hover": {
                      color: "#EDF6FF",
                      border: "1px solid #111111",
                    },
                  },
                },
              }}
            />
          </Box>
        </div>
        <Box sx={{ flexGrow: 1 }} />

        {/* Filters Section */}
        {showFilters && (
          <div className="flex flex-row justify-between items-center gap-[0.5rem] px-[0rem] mt-[1rem]">
            {/* Search Name Section */}
            <TextField
              name="name"
              label="Name"
              variant="filled"
              // size="small"
              autoFocus
              value={filters.name || ""}
              onChange={handleFilterChange}
              slotProps={{
                input: {
                  style: {
                    color: "#EDF6FF",
                    backgroundColor: "#282828",
                    borderRadius: "0.5rem",
                    borderWidth: "0.1rem",
                    borderColor: "#D7AE83",
                    outline: "none",
                  },
                },
                inputLabel: {
                  style: {
                    color: "#999999",
                  },
                },
              }}
              sx={{
                width: "15%",
                "& .MuiFilledInput-root": {
                  "&:before": {
                    borderBottom: "none !important",
                  },
                  "&:hover:before": {
                    borderBottom: "none !important",
                  },
                  "&:after": {
                    borderBottom: "none !important",
                  },
                },
              }}
            />

            {/* Department Section */}
            <FormControl variant="filled" sx={{ width: "15%" }}>
              <InputLabel style={{ color: "#999999" }} id="assets-label">
                Department
              </InputLabel>
              <Select
                labelId="department-label"
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                displayEmpty
                style={{
                  color: "#EDF6FF",
                  backgroundColor: "#282828",
                  borderRadius: "0.5rem",
                  borderWidth: "0.1rem",
                  borderColor: "#D7AE83",
                  outline: "none",
                }}
                sx={{
                  "& .MuiSelect-icon": {
                    color: "#999999",
                  },
                  "& .MuiSelect-select": {
                    color: "#EDF6FF !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D7AE83",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D7AE83",
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
              >
                {attendanceData.map((attendance) => (
                  <MenuItem
                    key={attendance.department}
                    value={attendance.department}
                  >
                    {attendance.department}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Select Quarter Section */}
            <FormControl variant="filled" sx={{ width: "15%" }}>
              <InputLabel style={{ color: "#999999" }} id="assets-label">
                Quarter
              </InputLabel>
              <Select
                labelId="quarter-label"
                name="quarter"
                value={filters.quarter || ""}
                onChange={handleFilterChange}
                displayEmpty
                style={{
                  color: "#EDF6FF",
                  backgroundColor: "#282828",
                  borderRadius: "0.5rem",
                  borderWidth: "0.1rem",
                  borderColor: "#D7AE83",
                  outline: "none",
                }}
                sx={{
                  "& .MuiSelect-icon": {
                    color: "#999999",
                  },
                  "& .MuiSelect-select": {
                    color: "#EDF6FF !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D7AE83",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D7AE83",
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
              >
                <MenuItem value={1}>Q1</MenuItem>
                <MenuItem value={2}>Q2</MenuItem>
                <MenuItem value={3}>Q3</MenuItem>
                <MenuItem value={4}>Q4</MenuItem>
              </Select>
            </FormControl>

            {/* Month and Year Pick Section */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="month"
                label="Month"
                views={["month"]}
                value={filters.month}
                onChange={(date) => handleDateChange("month", date)}
                renderInput={(params) => (
                  <TextField {...params} variant="filled" size="small" />
                )}
              />
              <DatePicker
                name="year"
                label="Year"
                views={["year"]}
                value={filters.year}
                onChange={(date) => handleDateChange("year", date)}
                maxDate={dayjs(`${currentYear}-12-31`)}
                renderInput={(params) => (
                  <TextField {...params} variant="filled" size="small" />
                )}
              />
            </LocalizationProvider>

            {/* Date Range Section */}
            <DateRangePicker
              startDate={filters.startDate}
              endDate={filters.endDate}
              onDateChange={(name, date) =>
                handleFilterChange({ target: { name, value: date } })
              }
            />

            {/* Clear Filters Button */}
            <Button
              variant="outlined"
              onClick={clearFilters}
              sx={{
                color: "#D7AE83",
                backgroundColor: "#111111",
                fontSize: "12px",
                fontWeight: "500",
                border: "1px solid #111111",
                borderRadius: "5px",
                padding: "6px 12px",
                "&:hover": {
                  color: "#EDF6FF",
                  border: "1px solid #111111",
                },
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </GridToolbarContainer>
  );
}

const AttendanceReports = () => {
  const [filters, setFilters] = useState({
    name: "",
    department: null,
    month: null,
    quarter: null,
    year: null,
    startDate: null,
    endDate: null,
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleDateChange = (name, date) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: date,
    }));
  };

  // useMemo ensures that the filtered data is computed only when filters change
  const filteredData = useMemo(() => {
    let filtered = attendanceData;

    if (filters.name) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.department) {
      filtered = filtered.filter(
        (item) => item.department === filters.department
      );
    }
    if (filters.month) {
      const month = dayjs(filters.month).month() + 1;
      filtered = filtered.filter(
        (item) => dayjs(item.date).month() + 1 === month
      );
    }
    if (filters.quarter) {
      const quarter = filters.quarter;
      const quarterStartMonth = (quarter - 1) * 3 + 1;
      filtered = filtered.filter((item) => {
        const month = dayjs(item.date).month() + 1;
        return month >= quarterStartMonth && month < quarterStartMonth + 3;
      });
    }
    if (filters.year) {
      const year = dayjs(filters.year).year();
      filtered = filtered.filter((item) => dayjs(item.date).year() === year);
    }
    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter((item) => {
        const date = dayjs(item.date);
        return date.isBetween(filters.startDate, filters.endDate, null, "[]");
      });
    } else if (filters.startDate && !filters.endDate) {
      filtered = filtered.filter((item) => {
        const date = dayjs(item.date);
        return date.isSame(filters.startDate, "day");
      });
    }

    return filtered;
  }, [filters]);

  const clearFilters = () => {
    setFilters({
      name: "",
      department: "",
      month: null,
      quarter: null,
      year: null,
      startDate: null,
      endDate: null,
    });
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "empId", headerName: "Employee ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "checkInTime", headerName: "Checked In", flex: 1 },
    { field: "checkOutTime", headerName: "Checked Out", flex: 1 },
    { field: "workingHours", headerName: "Working Hours", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
  ];

  return (
    <Box>
      <Box
        m="10px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            borderRadius: "12px",
            overflow: "hidden",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-cell": {
            color: "#d7ae83",
          },
          "& .id-cell": {
            color: "#d7ae83",
          },
          "& .role-cell": {
            color: "#d7ae83",
          },
          "& .status-cell": {
            color: "#d7ae83",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#333333 !important",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "#111111 !important",
          },
          "& .MuiDataGrid-columnSeparator": {
            color: "#999999 !important",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#252525",
            color: "#EDF6FF",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#EDF6FF",
          },
          "& .MuiDataGrid-toolbarContainer": {
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor: "#e6ccb1",
            padding: "8px",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: "#111111",
          },
          "& .MuiCheckbox-root": {
            color: "#e6ccb1",
          },
          "& .MuiCheckbox-root.Mui-checked": {
            color: "#e6ccb1",
          },
          "& .MuiCheckbox-root.MuiCheckbox-indeterminate": {
            color: "#e6ccb1",
          },
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
            outline: "none !important",
          },
          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: "#505c66 !important",
          },
        }}
      >
        <DataGrid
          rows={filteredData}
          columns={columns}
          checkboxSelection
          slots={{
            toolbar: (props) => (
              <CustomToolbar
                filters={filters}
                handleFilterChange={handleFilterChange}
                handleDateChange={handleDateChange}
                clearFilters={clearFilters}
                // handleExportExcel={handleExportExcel}
                // handleExportPdf={handleExportPdf}
                {...props}
              />
            ),
          }}
          sx={{
            width: "100%",
            minWidth: "600px",
            overflowX: "auto",
          }}
        />
      </Box>
    </Box>
  );
};

export default AttendanceReports;
