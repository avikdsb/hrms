import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";

import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ApprovalOutlinedIcon from "@mui/icons-material/ApprovalOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import DevicesOtherOutlinedIcon from "@mui/icons-material/DevicesOtherOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import AlarmOffOutlinedIcon from "@mui/icons-material/AlarmOffOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";

import { styles } from "../styles";
import "./sections.css";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <div>{title}</div>

      <Link to={to} />
    </MenuItem>
  );
};

const LeftSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const [reportsOpen, setReportsOpen] = useState(false);

  const handleResize = () => {
    // Collapse when screen width is less than 768
    // (using the 'md' breakpoint) => tailwind configuration
    if (window.innerWidth < 768) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-1">
      <ProSidebar
        collapsed={isCollapsed}
        collapsedWidth="4.7rem"
        width={"16rem"}
      >
        <Menu iconShape="circle">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: "#EDF6FF",
            }}
            className="font-title"
          >
            <div className="flex flex-row justify-between items-center">
              <div className="font-title">ADMIN</div>
              {!isCollapsed && (
                <IconButton
                  style={{
                    color: "#EDF6FF",
                    height: "2.2rem",
                    width: "2.2rem",
                  }}
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              )}
            </div>
          </MenuItem>

          <div
            className={`${
              isCollapsed ? "" : "pl-0 items-center"
            } font-subtitle text-${styles.sideNavbarSize}`}
          >
            <Item
              title="Dashboard"
              to="/"
              icon={<DashboardOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Employees"
              to="/employees"
              icon={<AccountBoxOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Approvals"
              to="/approvals"
              icon={<ApprovalOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Reports"
              to="/reports"
              icon={<AssessmentOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            {/* Dropdown for Reports */}
            <MenuItem
              icon={<AssessmentOutlinedIcon />}
              onClick={() => setReportsOpen(!reportsOpen)}
              active={selected === "Reports"}
            >
              Reports
            </MenuItem>
            {reportsOpen && (
              <div className="pl-[1rem]">
                <Item
                  title="Attendance Report"
                  icon={<HowToRegOutlinedIcon />}
                  to="/reports/attendance"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Leave Report"
                  icon={<AlarmOffOutlinedIcon />}
                  to="/reports/leave"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Performance Report"
                  icon={<SpeedOutlinedIcon />}
                  to="/reports/performance"
                  selected={selected}
                  setSelected={setSelected}
                />
                {/* Add more report items here */}
              </div>
            )}

            <Item
              title="Assets"
              to="/assets"
              icon={<DevicesOtherOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Item
              title="Roles"
              to="/roles"
              icon={<BadgeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="Settings"
              to="/settings"
              icon={<AdminPanelSettingsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Announcements"
              to="/announcements"
              icon={<CampaignOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default LeftSidebar;
