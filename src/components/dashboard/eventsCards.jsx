import React from "react";
import { styles } from "../../styles";
import { fourthRowEventsData } from "../../constants/dashboardData";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import AlarmOnOutlinedIcon from "@mui/icons-material/AlarmOnOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";

const DashboardEventsCard = ({ name, location, date, time, day }) => {
  return (
    <div className="flex flex-col justify-start items-start gap-5 p-[1rem] rounded-2xl ">
      <div
        className={`flex flex-row justify-start font-subtitle text-${styles.eventNameSize} gap-3`}
      >
        <CelebrationOutlinedIcon />
        <p>{name}</p>
      </div>
      <div className="flex flex-col gap-5 ml-5">
        <div
          className={`flex flex-row gap-3 text-${styles.eventDateSize} font-subtitle`}
        >
          <EventAvailableOutlinedIcon />

          <p>{day}</p>

          <p>{date}</p>
        </div>

        <div
          className={`flex flex-row justify-start gap-3 text-${styles.eventTimeSize} font-subtitle`}
        >
          <AlarmOnOutlinedIcon />
          <p>{time}</p>
        </div>
        <div
          className={`flex text-${styles.eventLocationSize} font-subtitle gap-3`}
        >
          <RestaurantMenuOutlinedIcon />
          <p>{location}</p>
        </div>
      </div>
      <div style={{ borderTop: "0.25px solid #a6a6a6", width: "100%" }}></div>
    </div>
  );
};

const EventsCards = () => {
  return (
    <main>
      <div className={`flex flex-col`}>
        {fourthRowEventsData.map((cardData, index) => (
          <DashboardEventsCard
            key={`cardData-${index}`}
            index={index}
            {...cardData}
          />
        ))}
      </div>
    </main>
  );
};

export default EventsCards;

