import React from "react";
import { styles } from "../../styles";
import { EmployeeRegisterForm } from "../../components/employees";

const AddEmployee = () => {
  return (
    <div className={`flex flex-col p-5`}>
      <div className={`font-title text-${styles.titleSize} text-[#EDF6FF]`}>
        <h1 className="mb-[4rem]">Employees</h1>
      </div>
      <div className={`flex flex-col`}>
        <div className="flex flex-1 justify-start items-center gap-5 mb-[2rem]">
          <h5
            className={`font-subtitle text-${styles.subtitleSize} text-[#EDF6FF]`}
          >
            Add Employee
          </h5>
        </div>

        {/* Employee Add Form */}
        <EmployeeRegisterForm />
      </div>
    </div>
  );
};

export default AddEmployee;
