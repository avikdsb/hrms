import React from "react";
import { styles } from "../../styles";
import { fourthRowHolidaysData } from "../../constants/dashboardData";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const DashboardHolidayCard = ({ month, date, day, occasion }) => {
  return (
    <div className="flex flex-col justify-start items-start gap-5 p-[1rem] rounded-2xl">
      <div className="flex flex-row justify-start gap-3">
        <BookmarkAddedOutlinedIcon />
        <p className={`font-subtitle text-${styles.holidayMonthSize}`}>
          {month}
        </p>
      </div>
      <div className="flex flex-col gap-5 ml-5">
        <div
          className={`font-subtitle flex text-${styles.holidayDateSize} gap-3`}
        >
          <EventAvailableOutlinedIcon />

          <p>{day}</p>
          <p>{date}</p>
        </div>
        <div
          className={`flex font-subtitle text-${styles.holidayLocationSize} gap-3`}
        >
          <LocationOnOutlinedIcon />

          <p>{occasion}</p>
        </div>
      </div>
      <div style={{ borderTop: "0.25px solid #a6a6a6", width: "100%" }}></div>
    </div>
  );
};

const HolidayCards = () => {
  return (
    <main>
      <div className={`flex flex-col`}>
        {fourthRowHolidaysData.map((cardData, index) => (
          <DashboardHolidayCard
            key={`cardData-${index}`}
            index={index}
            {...cardData}
          />
        ))}
      </div>
    </main>
  );
};

export default HolidayCards;
