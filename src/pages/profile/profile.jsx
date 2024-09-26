import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import { useUser } from "../../context/userContext";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const Profile = ({ open, onClose }) => {
  const { user } = useUser();

  // Fetch the employee data based on the logged-in user's empId
  // const employee = employeeData.find((emp) => emp.empId === user?.empId);

  return (
    <Dialog
      open={open}
      // Disable the default close behavior
      onClose={null}
      maxWidth="sm"
      PaperProps={{
        style: {
          backgroundColor: "#333333",
          borderRadius: "20px",
          boxShadow: "none",
          position: "relative",
          width: "100%",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          color: "#EDF6FF",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <CloseOutlinedIcon />
      </IconButton>
      <DialogTitle
        sx={{
          color: "#EDF6FF",
          textAlign: "start",
          fontFamily: "Audiowide",
          marginBottom: "2rem",
          paddingLeft: "2rem",
        }}
      >
        Profile
      </DialogTitle>
      <DialogContent
        sx={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          color: "#EDF6FF",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {user ? (
          <div className="flex flex-col">
            <div className="flex flex-row gap-5">
              <img
                src={user.image}
                alt={user.name}
                style={{ width: "50%", height: "200px", borderRadius: "1rem" }}
              />

              <div className="flex flex-col gap-2 w-[50%] font-subtitle">
                <p>
                  Emp-ID: <span className="text-[#D7AE83]"> {user.empId}</span>
                </p>
                <p>
                  Name: <span className="text-[#D7AE83]"> {user.name}</span>
                </p>
                <p>
                  Email: <span className="text-[#D7AE83]"> {user.email}</span>
                </p>
                <p>
                  Role: <span className="text-[#D7AE83]"> {user.role}</span>
                </p>
                <p>
                  Department:{" "}
                  <span className="text-[#D7AE83]"> {user.department}</span>
                </p>
                <p>
                  Status: <span className="text-[#D7AE83]"> {user.status}</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>No employee information available</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Profile;
