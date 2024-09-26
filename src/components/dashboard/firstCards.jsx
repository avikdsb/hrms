import React from "react";
import { styles } from "../../styles";
import { firstRowCardsData } from "../../constants/dashboardData";
import PolarChart from "../charts/polarChart";
import "../components.css";
import EmployeeChart from "../charts/barChart";

const FirstCard = ({ title, value, date }) => (
  <div className="w-full">
    <div className="flex flex-wrap first_card_gradient p-5 gap-10 justify-between rounded-2xl w-full">
      <div className="flex flex-col">
        <h3 className={`font-bold text-${styles.cardsTitleSize} w-[6rem]`}>
          {title}
        </h3>
        <p className={`mt-2 text-${styles.regularSize}`}>
          <span className="font-subtitle text-[#D7AE83]">Last Updated</span>{" "}
          <div className="font-subtitle text-[#D7AE83]">{date}</div>
        </p>
      </div>
      <div
        className={`number_chart flex justify-center items-center font-subtitle text-${styles.cardsNumberSize} font-bold`}
      >
        <p>{value}</p>
      </div>
    </div>
  </div>
);

const FirstRowDashboard = () => {
  return (
    <main className={`first_card_back_gradient p-5 rounded-xl`}>
      <h5 className={`mb-[1rem] font-subtitle text-${styles.cardsTitleSize}`}>
        Employees Data
      </h5>
      <div
        className={`flex flex-col sm:flex-row gap-5 justify-between items-center overflow-hidden text-[#D7AE83] rounded-xl `}
      >
        <div className="flex justify-center items-center w-full sm:w-1/3 mx-auto">
          <PolarChart />
        </div>
        <div className="flex justify-center items-center w-full sm:w-1/3 mx-auto">
          <EmployeeChart />
        </div>

        <div className="flex flex-wrap p-5 gap-5 justify-center w-full sm:w-1/3 mx-auto">
          {firstRowCardsData.map((cardData, index) => (
            <FirstCard key={`cardData-${index}`} index={index} {...cardData} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default FirstRowDashboard;
