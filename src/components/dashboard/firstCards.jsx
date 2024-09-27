import React from "react";
import { styles } from "../../styles";
import { firstRowCardsData } from "../../constants/dashboardData";
import PolarChart from "../charts/polarChart";
import "../components.css";

const FirstCard = ({ title, value, date }) => (
  <div className="w-fit">
    <div className="flex flex-wrap first_card_gradient p-5 gap-10 justify-between rounded-2xl lg:w-[full] md:w-[20rem] sm:w-[12rem] xs:w-[10rem]">
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
    <main>
      <div
        className={`flex flex-col xs:flex-row p-5 gap-5 justify-between items-center overflow-hidden text-[#D7AE83] rounded-xl first_card_back_gradient `}
      >
        <div className="flex justify-center items-center w-1/2 mx-auto">
          <PolarChart />
        </div>
        <div className="flex flex-wrap p-5 gap-5 justify-center w-1/2">
          {firstRowCardsData.map((cardData, index) => (
            <FirstCard key={`cardData-${index}`} index={index} {...cardData} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default FirstRowDashboard;
