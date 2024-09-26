import React from "react";
import { styles } from "../../styles";
import { secondRowCardsData } from "../../constants/dashboardData";
import "../components.css";
import {
  DailyActiveEmployees,
  DailyLateLoginEmployees,
  DailyOnLeaveEmployees,
} from "../charts";

const SecondRowDashboard = () => {
  return (
    <main className={`second_card_back_gradient p-5 rounded-xl`}>
      <h5 className={`mb-[1rem] font-subtitle text-${styles.cardsTitleSize}`}>
        Daily Activity
      </h5>

      <div
        className={`flex flex-col xs:flex-row justify-between overflow-hidden gap-10 rounded-xl`}
      >
        <div className="flex flex-col justify-between items-center gap-5 p-5 rounded-2xl w-[full]">
          <div className="flex flex-col gap-5">
            <div
              className={`number_chart font-bold flex text-${styles.cardsNumberSize} text-[#D7AE83] font-subtitle`}
            >
              <DailyActiveEmployees />
            </div>
          </div>
          <div className="flex flex-col gap-5 h-[3rem]">
            <h3 className={`text-${styles.cardsTitleSize}`}>Active</h3>
          </div>
        </div>
        {/* Late Login */}
        <div className="flex flex-col justify-between items-center gap-5 p-5 rounded-2xl w-[full]">
          <div className="flex flex-col gap-5">
            <div
              className={`number_chart font-bold flex text-${styles.cardsNumberSize} text-[#D7AE83] font-subtitle`}
            >
              <DailyLateLoginEmployees />
            </div>
          </div>
          <div className="flex flex-col gap-5 h-[3rem]">
            {/* <h3 className={`text-${styles.subtitleSize} font-bold`}>{title}</h3> */}
            <h3 className={`text-${styles.cardsTitleSize}`}>Late Login</h3>
          </div>
        </div>
        {/* On Leave */}
        <div className="flex flex-col justify-between items-center gap-5 p-5 rounded-2xl w-[full]">
          <div className="flex flex-col gap-5">
            <div
              className={`number_chart font-bold flex text-${styles.cardsNumberSize} text-[#D7AE83] font-subtitle`}
            >
              <DailyOnLeaveEmployees />
            </div>
          </div>
          <div className="flex flex-col gap-5 h-[3rem]">
            {/* <h3 className={`text-${styles.subtitleSize} font-bold`}>{title}</h3> */}
            <h3 className={`text-${styles.cardsTitleSize}`}>On Leave</h3>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SecondRowDashboard;
