import React from "react";
import { styles } from "../../styles";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { useNavigate } from "react-router-dom";
import { EmployeeList } from "../../components/employees";

const Employees = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/employees/addEmployee");
  };

  return (
    <div className={`flex flex-col p-5`}>
      <div className={`font-title text-${styles.titleSize}`}>
        <h1 className="mb-[4rem]">Employees</h1>
      </div>

      <div className="flex flex-1 justify-between items-center bg-[#212121] p-[1rem] mb-[1rem] rounded-xl gap-5">
        <h5 className={`font-subtitle text-[1.5rem]`}>Employees List</h5>

        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 rounded-lg px-3 py-2 border border-[#D7AE83] text-[#D7AE83] font-semibold hover:bg-[#111111] hover:text-[#EDF6FF] group"
        >
          <PersonAddOutlinedIcon className="text-[#D7AE83] group-hover:text-[#EDF6FF]" />
          ADD
        </button>
      </div>

      {/* EMPLOYEE LIST */}
      <EmployeeList />
    </div>
  );
};

export default Employees;
