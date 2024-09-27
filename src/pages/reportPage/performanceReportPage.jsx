import React from "react";
import { styles } from "../../styles";

const PerformanceReportPage = () => {
  return (
    <div className={`flex flex-col p-5`}>
      <div className={`font-title text-${styles.titleSize} text-[#EDF6FF]`}>
        <h1 className="mb-[4rem]">Reports</h1>
      </div>
      <div className="flex flex-1 justify-between items-center bg-[#212121] p-[1rem] mb-[1rem] rounded-xl gap-5">
        <h5
          className={`font-subtitle text-[1.5rem] py-[0.17rem] text-[#EDF6FF]`}
        >
          Performance Report
        </h5>
      </div>

      {/* REPORTS LIST */}
      {/* <PerformanceReports /> */}
    </div>
  );
};

export default PerformanceReportPage;
