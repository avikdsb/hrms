import React from "react";
import { Box, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const DateRangePicker = ({ startDate, endDate, onDateChange }) => {
  const today = dayjs().endOf("day");

  const handleDateChange = (date, type) => {
    if (date && dayjs(date).isValid()) {
      if (type === "startDate") {
        // Validate and toggle start date
        if (dayjs(date).isAfter(today)) {
          // Prevent selecting future dates
          onDateChange("startDate", today);
        } else {
          onDateChange("startDate", date);
          // Reset end date if it's before the new start date
          if (endDate && dayjs(endDate).isBefore(date)) {
            onDateChange("endDate", null);
          }
        }
      } else if (type === "endDate") {
        // Validate end date based on start date
        if (!startDate) {
          // Do not allow end date selection if start date is not set
          return;
        }
        if (dayjs(date).isAfter(today)) {
          // Prevent selecting future dates for end date
          onDateChange("endDate", today);
        } else if (
          dayjs(date).isBefore(startDate) ||
          dayjs(date).isSame(startDate, "day")
        ) {
          // Prevent selecting end date that is before or the same as the start date
          onDateChange("endDate", null);
        } else {
          onDateChange("endDate", date);
        }
      }
    } else {
      // Handle clearing the date if it's not valid
      if (type === "startDate") {
        onDateChange("startDate", null);
      } else if (type === "endDate") {
        onDateChange("endDate", null);
      }
    }
  };

  return (
    <Box
      display="flex"
      gap="0.5rem"
      sx={{
        width: "25%",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date"
          value={startDate}
          maxDate={today}
          onChange={(date) => handleDateChange(date, "startDate")}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          minDate={startDate ? dayjs(startDate).add(1, "day") : null}
          maxDate={today}
          onChange={(date) => handleDateChange(date, "endDate")}
          renderInput={(params) => <TextField {...params} />}
          disabled={!startDate}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DateRangePicker;
