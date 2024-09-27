import React from "react";
import { styles } from "../../styles";
import "../pages.css";
import {
  EventsCards,
  FirstRowDashboard,
  HolidayCards,
  SecondRowDashboard,
} from "../../components/dashboard";
import { useUser } from "../../context/userContext";
import { useSelector } from "react-redux";

const Dashboard = () => {

  const {user} = useUser()
  const role= user?.role
  const permission = useSelector((store)=> store.contentReducer[role]) // access store using useSelector based on user role
  const dashboard = permission?.Dashboard


  return (
    <div className={`flex flex-col p-5`}>
      <h1 className={`font-title text-${styles.titleSize} mb-[4rem]`}>
        Dashboard
      </h1>

      {/* First Row of the Dashboard */}
      {/* props pass to FirstRowDashboard to show the content */}
      {dashboard?.EmployeeCharts && <FirstRowDashboard />}

      <div className="mb-[5rem]"></div>

      {/* Second Row of the Dashboard */}
      {/* add sample condition on SecondRowDashboard  and EventCards */}
      {dashboard?.DailyActivityCharts && <SecondRowDashboard />}

      <div className="flex flex-col xs:flex-row px-[0.7rem] justify-center overflow-hidden gap-5 mt-[5rem] w-full">
        {
          dashboard?.HolidayCard &&
          <div className="flex flex-col w-full xs:w-1/2">
            {/* Holidays Section */}
            <h6 className={`font-title text-${styles.cardsTitleSize} mb-[2rem]`}>
              Holidays
            </h6>
            <div className="holidays_cards_color rounded-xl overflow-hidden">
              <HolidayCards />
            </div>
          </div>
        }

        {
          dashboard?.EventCard &&
          <div className="flex flex-col w-full xs:w-1/2">
            {/* Events Section */}
            <h6
              className={`font-title text-${styles.cardsTitleSize} mb-[2rem] xs:mt-0 mt-[4rem]`}
            >
              Events
            </h6>
            <div className="events_cards_color rounded-xl overflow-hidden">
              <EventsCards />
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Dashboard;
