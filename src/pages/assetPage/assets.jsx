import React, { useState, useEffect } from "react";
import { styles } from "../../styles";
import AddToQueueOutlinedIcon from "@mui/icons-material/AddToQueueOutlined";
import { useNavigate } from "react-router-dom";
import { AssetsList, TotalAssetsDetails } from "../../components/asset";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { assetsData as initialAssetsData } from "../../constants/employeeData"; // Existing assets data
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

const Assets = () => {
  const [selectedTable, setSelectedTable] = useState("AssetsList");
  // State to hold the table data
  const [assetsData, setAssetsData] = useState([]);
  const navigate = useNavigate();

  // Simulating fetching data from a database (currently using constant file)
  useEffect(() => {
    // Simulate API call to fetch assets data
    setTimeout(() => {
      setAssetsData(initialAssetsData); // Set initial assets data (from constant file)
    }, 1000); // Simulating a slight delay for fetching
  }, []);

  const handleAddClick = () => {
    navigate("/assets/addAsset");
  };

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
                assetId: row["Asset ID"], // Standardize the key names
                assetType: row["Asset Type"],
                brandName: row["Brand"],
                serialNumber: row["Serial Number"],
                assetDop: row["Date of Purchase"],
                ownershipType: row["Ownership Type"],
                usageHistory: row["Usage History"],
                assetInvoice: row["Invoice"],
                assetQty: row["Quantity"],
                assetPhoto: row["Image"],
                assignedEmpId: row["Assigned Employee"],
              }))
              .filter((row) => row.assetId && row.assetType && row.brandName); // Filter out rows with undefined or empty values

            // Filter out duplicates before updating state
            const filteredNewRows = newRows.filter(
              (newRow) =>
                !assetsData.some(
                  (existingRow) => existingRow.assetId === newRow.assetId
                )
            );

            // After filtering, assign a unique ID starting from assetsData.length + 1
            const updatedRowsWithId = filteredNewRows.map((row, index) => ({
              ...row,
              id: assetsData.length + index + 1, // Unique and continuous ID
            }));

            setAssetsData((prevData) => [...prevData, ...updatedRowsWithId]); // Append new data
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
            assetId: row["Asset ID"], // Standardize the key names
            assetType: row["Asset Type"],
            brandName: row["Brand"],
            serialNumber: row["Serial Number"],
            assetDop: row["Date of Purchase"],
            ownershipType: row["Ownership Type"],
            usageHistory: row["Usage History"],
            assetInvoice: row["Invoice"],
            assetQty: row["Quantity"],
            assetPhoto: row["Image"],
            assignedEmpId: row["Assigned Employee"],
          }))
          .filter((row) => row.assetId && row.assetType && row.brandName); // Filter out rows with undefined or empty values

        // Filter out duplicates before updating state
        const filteredNewRows = newRows.filter(
          (newRow) =>
            !assetsData.some(
              (existingRow) => existingRow.assetId === newRow.assetId
            )
        );

        // After filtering, assign a unique ID starting from assetsData.length + 1
        const updatedRowsWithId = filteredNewRows.map((row, index) => ({
          ...row,
          id: assetsData.length + index + 1, // Unique and continuous ID
        }));

        setAssetsData((prevData) => [...prevData, ...updatedRowsWithId]); // Append new data
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
      <div className={`font-title text-${styles.titleSize} text-[#EDF6FF]`}>
        <h1 className="mb-[4rem]">Assets</h1>
      </div>

      <div className="flex flex-row justify-between items-center bg-[#212121] p-[1rem] mb-[1rem] rounded-xl gap-5">
        <div className="flex sm:flex-row flex-col gap-4">
          <button
            onClick={() => setSelectedTable("AssetsList")}
            className={`px-5 py-2 rounded-lg text-[1rem] font-semibold ${
              selectedTable === "AssetsList"
                ? "bg-[#D7AE83] text-[#000000]"
                : "bg-[#111111] text-[#D7AE83] border border-[#D7AE83]"
            }`}
          >
            Assets List
          </button>
          <button
            onClick={() => setSelectedTable("TotalAssetsDetails")}
            className={`px-5 py-2 rounded-lg text-[1rem] font-semibold ${
              selectedTable === "TotalAssetsDetails"
                ? "bg-[#D7AE83] text-[#000000]"
                : "bg-[#111111] text-[#D7AE83] border border-[#D7AE83]"
            }`}
          >
            Assets Stock Details
          </button>
        </div>

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
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#D7AE83] border border-[#D7AE83] hover:bg-[#000000] hover:text-[#ffffff] font-semibold group"
          >
            <AddToQueueOutlinedIcon className="text-[#D7AE83] group-hover:text-[#EDF6FF]" />
            ADD
          </button>
        </div>
      </div>

      {/* {selectedTable === "AssetsList" ? <AssetsList /> : <TotalAssetsDetails />} */}

      {selectedTable === "AssetsList" ? (
        <AssetsList newAssetsData={assetsData} />
      ) : (
        <TotalAssetsDetails />
      )}
    </div>
  );
};

export default Assets;
