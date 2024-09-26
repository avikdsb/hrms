import React, { useEffect, useState } from "react";
import { styles } from "../../styles";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { useNavigate } from "react-router-dom";
import { EmployeeList } from "../../components/employees";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { employeeData as initialEmployeesData } from "../../constants/employeeData";
import * as XLSX from "xlsx";
import Papa from "papaparse";

const Employees = () => {
  const navigate = useNavigate();
  // State to hold the table data
  const [employeesData, setEmployeesData] = useState([]);

  const handleAddClick = () => {
    navigate("/employees/addEmployee");
  };
  // Simulating fetching data from a database (currently using constant file)
  useEffect(() => {
    // Simulate API call to fetch assets data
    setTimeout(() => {
      setEmployeesData(initialEmployeesData); // Set initial assets data (from constant file)
    }, 1000); // Simulating a slight delay for fetching
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (!file) {
      alert("No file selected. Please select a valid CSV or Excel file.");
      return; // Early return if no file is selected
    }

    reader.onload = (e) => {
      const fileContent = e.target.result;

      if (file.name.endsWith(".csv")) {
        // Parse CSV files
        Papa.parse(fileContent, {
          header: true,
          complete: (results) => {
            let newRows = results.data
              .map((row) => ({
                empPhoto: row["Photo"], // Standardize the key names
                empId: row["Employee ID"], // Standardize the key names
                empName: row["Name"], // Standardize the key names
                empPhone: row["Phone Number"], // Standardize the key names
                empEmail: row["Email ID"],
                empPermanentAddress: row["Permanent Address"],
                empCurrentAddress: row["Current Address"],
                empAadhaarId: row["Aadhaar ID"],
                empPanId: row["Pan ID"],
                empDob: row["D.O.B."],
                empDoj: row["D.O.J."],
                empDepartment: row["Department"],
                empDesignation: row["Designation"],
                empGrade: row["Grade"],
                empRole: row["Role"],
                empReporting1: row["Reporting 1"],
                empReporting2: row["Reporting 2"],
                empAssets: row["Asset ID"],
                empStatus: row["Status"],
              }))
              .filter((row) => row.empId); // Filter out rows with undefined or empty values

            // Filter out duplicates before updating state
            const filteredNewRows = newRows.filter(
              (newRow) =>
                !employeesData.some(
                  (existingRow) => existingRow.empId === newRow.empId
                )
            );

            // After filtering, assign a unique ID starting from assetsData.length + 1
            const updatedRowsWithId = filteredNewRows.map((row, index) => ({
              ...row,
              id: employeesData.length + index + 1, // Unique and continuous ID
            }));

            setEmployeesData((prevData) => [...prevData, ...updatedRowsWithId]); // Append new data
          },
          error: (error) => {
            console.error("Error parsing CSV file:", error);
          },
        });
      } else if (file.name.endsWith(".xlsx")) {
        // Parse Excel files
        const workbook = XLSX.read(fileContent, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        let newRows = worksheet
          .map((row) => ({
            empPhoto: row["Photo"], // Standardize the key names
            empId: row["Employee ID"], // Standardize the key names
            empName: row["Name"], // Standardize the key names
            empPhone: row["Phone Number"], // Standardize the key names
            empEmail: row["Email ID"],
            empPermanentAddress: row["Permanent Address"],
            empCurrentAddress: row["Current Address"],
            empAadhaarId: row["Aadhaar ID"],
            empPanId: row["Pan ID"],
            empDob: row["D.O.B."],
            empDoj: row["D.O.J."],
            empDepartment: row["Department"],
            empDesignation: row["Designation"],
            empGrade: row["Grade"],
            empRole: row["Role"],
            empReporting1: row["Reporting 1"],
            empReporting2: row["Reporting 2"],
            empAssets: row["Asset ID"],
            empStatus: row["Status"],
          }))
          .filter((row) => row.empId); // Filter out rows with undefined or empty values

        // Filter out duplicates before updating state
        const filteredNewRows = newRows.filter(
          (newRow) =>
            !employeesData.some(
              (existingRow) => existingRow.empId === newRow.empId
            )
        );

        // After filtering, assign a unique ID starting from assetsData.length + 1
        const updatedRowsWithId = filteredNewRows.map((row, index) => ({
          ...row,
          id: employeesData.length + index + 1, // Unique and continuous ID
        }));

        setEmployeesData((prevData) => [...prevData, ...updatedRowsWithId]); // Append new data
      }
    };

    if (file.name.endsWith(".xlsx")) {
      reader.readAsArrayBuffer(file);
    } else if (file.name.endsWith(".csv")) {
      reader.readAsText(file);
    } else {
      alert("Please upload a valid CSV or Excel file.");
    }
  };

  return (
    <div className={`flex flex-col p-5`}>
      <div className={`font-title text-${styles.titleSize}`}>
        <h1 className="mb-[4rem]">Employees</h1>
      </div>

      <div className="flex flex-1 justify-between items-center bg-[#212121] p-[1rem] mb-[1rem] rounded-xl gap-5">
        <h5 className={`font-subtitle text-[1.5rem]`}>Employees List</h5>
        <div className="flex sm:flex-row flex-col gap-4">
          <div className="">
            <input
              id="file-upload"
              type="file"
              accept=".csv, .xlsx"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => document.getElementById("file-upload").click()} // Triggers file input click
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#D7AE83] border border-[#D7AE83] hover:bg-[#000000] hover:text-[#ffffff] font-semibold group"
            >
              <FileUploadOutlinedIcon className="text-[#D7AE83] group-hover:text-[#EDF6FF]" />
              UPLOAD
            </button>
          </div>

          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 rounded-lg px-3 py-2 border border-[#D7AE83] text-[#D7AE83] font-semibold hover:bg-[#111111] hover:text-[#EDF6FF] group"
          >
            <PersonAddOutlinedIcon className="text-[#D7AE83] group-hover:text-[#EDF6FF]" />
            ADD
          </button>
        </div>
      </div>

      {/* EMPLOYEE LIST */}
      <EmployeeList newEmployeesData={employeesData} />
    </div>
  );
};

export default Employees;
