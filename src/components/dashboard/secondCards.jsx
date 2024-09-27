import React from "react";
import { styles } from "../../styles";
import { secondRowCardsData } from "../../constants/dashboardData";
import "../components.css";

const SecondCard = ({ title, value, date }) => {
  return (
    <div className="flex flex-col justify-between items-center gap-5 p-5 rounded-2xl w-[full]">
      <div className="flex flex-col gap-5 h-[3rem]">
        <h3 className={`text-${styles.subtitleSize} font-bold`}>
          {title}
        </h3>
      </div>
      <div className="flex flex-col gap-5">
        <div
          className={`number_chart font-bold flex text-${styles.cardsNumberSize} text-[#D7AE83] font-subtitle`}
        >
          <p>{value}</p>
        </div>
      </div>
    </div>
  );
};

const SecondRowDashboard = () => {
  return (
    <main>
      <div
        className={`flex flex-col xs:flex-row p-5 rounded-xl justify-between overflow-hidden gap-10 second_card_back_gradient mt-5`}
      >
        {secondRowCardsData.map((cardData, index) => (
          <SecondCard key={`cardData-${index}`} index={index} {...cardData} />
        ))}
      </div>
    </main>
  );
};

export default SecondRowDashboard;
