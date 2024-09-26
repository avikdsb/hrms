import React, { useState } from "react";
import { styles } from "../../styles";
import {
  RoleManagement,
  RoleRegisterForm,
} from "../../components/roleManagement";

const RoleManage = () => {
  const [selectedTable, setSelectedTable] = useState("RoleManagement");

  return (
    <div className={`flex flex-col p-5`}>
      <div className={`font-title text-${styles.titleSize} text-[#EDF6FF]`}>
        <h1 className="mb-[4rem]">Manage Roles</h1>
      </div>
      <div className="flex flex-row justify-between items-center bg-[#212121] p-[1rem] mb-[1rem] rounded-xl gap-5">
        <div className="flex flex-row gap-4">
          <button
            onClick={() => setSelectedTable("RoleManagement")}
            className={`px-5 py-2 rounded-lg text-[1rem] font-semibold ${
              selectedTable === "RoleManagement"
                ? "bg-[#D7AE83] text-[#000000]"
                : "bg-[#111111] text-[#D7AE83] border border-[#D7AE83]"
            }`}
          >
            Manage Roles
          </button>

          <button
            onClick={() => setSelectedTable("RoleRegisterForm")}
            className={`px-5 py-2 rounded-lg text-[1rem] font-semibold ${
              selectedTable === "RoleRegisterForm"
                ? "bg-[#D7AE83] text-[#000000]"
                : "bg-[#111111] text-[#D7AE83] border border-[#D7AE83]"
            }`}
          >
            Add Role
          </button>
        </div>
      </div>
      {selectedTable === "RoleManagement" ? (
        <RoleManagement />
      ) : (
        <RoleRegisterForm />
      )}
    </div>
  );
};

export default RoleManage;
