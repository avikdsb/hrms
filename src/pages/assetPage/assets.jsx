import React, { useState } from "react";
import { styles } from "../../styles";
import AddToQueueOutlinedIcon from "@mui/icons-material/AddToQueueOutlined";
import { useNavigate } from "react-router-dom";
import { AssetsList, TotalAssetsDetails } from "../../components/asset";

const Assets = () => {
  const [selectedTable, setSelectedTable] = useState("AssetsList");
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/assets/addAsset");
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

        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#D7AE83] border border-[#D7AE83] hover:bg-[#000000] hover:text-[#ffffff] font-semibold group"
        >
          <AddToQueueOutlinedIcon className="text-[#D7AE83] group-hover:text-[#EDF6FF]" />
          ADD
        </button>
      </div>

      {selectedTable === "AssetsList" ? <AssetsList /> : <TotalAssetsDetails />}
    </div>
  );
};

export default Assets;
