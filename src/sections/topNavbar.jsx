import React, { useState } from "react";
import { Logo } from "../assets";
import "./sections.css";
import { styles } from "../styles";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import Profile from "../pages/profile/profile";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const TopNavbar = ({ title }) => {
  const [openProfile, setOpenProfile] = useState(false);

  const navigate = useNavigate();

  const { user, handleSignout } = useUser();

  const handleSignOut = () => {
    handleSignout();
    navigate("/");
  };

  const handleRoleManagement = () => {
    navigate("/roles");
  };

  // Function to open the Profile dialog
  const handleOpenProfile = () => {
    setOpenProfile(true);
  };

  // Function to close the Profile dialog
  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  return (
    <div className="top_navbar_color flex p-2 items-center absolute right-0 z-50">
      {/* <div className={`flex font-title text-${styles.titleSize}`}>
        <h2>h{title}h</h2>
      </div> */}

      <div className="relative group">
        {/* Logo Section */}
        <img
          src={Logo}
          alt="logo"
          className="w-[5rem] h-[5rem] object-contain cursor-pointer"
        />

        {/* Dropdown Menu */}
        <ul className="absolute top-[5rem] right-[0.75rem] logo_dropdown_color shadow-lg rounded-xl py-2 w-[210px] hidden group-hover:block">
          <li
            className="flex flex-row justify-start items-center py-2 px-4 hover:bg-[#D7AE83] cursor-pointer gap-2"
            onClick={handleOpenProfile}
          >
            <div>
              <BadgeOutlinedIcon />
            </div>
            <div>Profile</div>
          </li>
          {/* Conditionally render Roles Management if user is Admin */}
          {user?.role === "Admin" && (
            <li
              className="flex flex-row justify-start items-center py-2 px-4 hover:bg-[#D7AE83] cursor-pointer gap-2"
              onClick={handleRoleManagement}
            >
              <div>
                <ManageAccountsOutlinedIcon />
              </div>
              <div>Roles Management</div>
            </li>
          )}
          <li
            className="flex flex-row justify-start items-center py-2 px-4 hover:bg-[#D7AE83] cursor-pointer gap-2"
            onClick={handleSignOut}
          >
            <div>
              <LogoutOutlinedIcon />
            </div>
            <div>Sign Out</div>
          </li>
        </ul>
      </div>
      {/* Profile Dialog */}
      <Profile open={openProfile} onClose={handleCloseProfile} />
    </div>
  );
};

export default TopNavbar;
