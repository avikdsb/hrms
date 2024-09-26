import React from "react";
import { styles } from "../../styles";
import "../pages.css";
import {
  EventsCards,
  FirstRowDashboard,
  HolidayCards,
  SecondRowDashboard,
} from "../../components/dashboard";
import EmployeeChart from "../../components/charts/barChart";

const Dashboard = () => {
  return (
    <div className={`flex flex-col p-5`}>
      <h1 className={`font-title text-${styles.titleSize} mb-[3rem]`}>
        Dashboard
      </h1>

      {/* First Row of the Dashboard */}
      <FirstRowDashboard />

      <div className="mb-5"></div>

      {/* Second Row of the Dashboard */}
      <SecondRowDashboard />

      <div className="flex flex-col xs:flex-row justify-center gap-5 mt-5 w-[100%] mx-auto">
        <div className="flex flex-col w-full xs:w-1/2">
          {/* Holidays Section */}

          <div className="holidays_cards_color rounded-xl overflow-hidden">
            <HolidayCards />
          </div>
        </div>

        <div className="flex flex-col w-full xs:w-1/2">
          {/* Events Section */}

          <div className="events_cards_color rounded-xl overflow-hidden">
            <EventsCards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
