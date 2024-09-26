import React from "react";
import { styles } from "../../styles";
import { holidaysData } from "../../constants/dashboardData";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

// Component for individual holiday card
const DashboardHolidayCard = ({ month, date, day, occasion, type }) => {
  // Define styles based on the type of holiday
  const holidayTextColor =
    type === "National" ? { color: "#ff5050" } : { color: "#5cadff" };

  return (
    <div className="flex flex-col justify-start items-start gap-5 p-[1rem] rounded-2xl ">
      <div className="flex flex-row justify-start gap-3">
        <BookmarkAddedOutlinedIcon />
        <p
          className={`font-subtitle text-${styles.holidayNameSize} text-[#D7AE83]`}
        >
          {occasion}
        </p>
      </div>
      <div className="flex flex-col justify-start items-start gap-5 ml-5">
        <div
          className={`font-subtitle flex flex-row justify-start text-${styles.holidayDateSize} gap-3 `}
          style={holidayTextColor}
        >
          <EventAvailableOutlinedIcon />
          <p>{day}</p>
          <p>{date}</p>
        </div>
      </div>
      <div style={{ borderTop: "0.25px solid #a6a6a6", width: "100%" }}></div>
    </div>
  );
};

// Component to render all holiday cards
const HolidayCards = () => {
  return (
    <main className={`p-5 rounded-xl`}>
      <h5 className={`mb-[2rem] font-subtitle text-${styles.cardsTitleSize}`}>
        Holidays List
      </h5>
      <div className="flex flex-col">
        {holidaysData.map((cardData, index) => (
          <DashboardHolidayCard
            key={`cardData-${index}`}
            {...cardData} // Spread card data to pass as props
          />
        ))}
      </div>
    </main>
  );
};

export default HolidayCards;
