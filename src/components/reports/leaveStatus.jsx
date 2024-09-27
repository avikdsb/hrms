import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
} from "@mui/material";
import LeaveDonutChart from "../charts/leaveDonutChart";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const LeaveStatus = ({
  open,
  handleClose,
  handleStatusChange,
  remainingLeave,
}) => {
  // Prevent closing the dialog when clicking outside
  // Prevent closing the dialog on backdrop click
  const handleDialogClose = (event, reason) => {
    if (reason !== "backdropClick") {
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: "#333333",
          borderRadius: "20px",
          boxShadow: "none",
          position: "relative",
        },
      }}
    >
      {/* <DialogTitle>Change Leave Status</DialogTitle> */}
      <DialogContent
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          position: "relative",
          color: "#EDF6FF",
        }}
      >
        <IconButton
          onClick={handleClose}
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
            zIndex: 1,
          }}
        >
          <CloseOutlinedIcon />
        </IconButton>

        <LeaveDonutChart />

        <p>Do you want to approve or reject this leave request?</p>
      </DialogContent>
      <DialogActions
        sx={{
          padding: "1rem",
        }}
      >
        <Button
          onClick={() => handleStatusChange("Approved")}
          sx={{
            backgroundColor: "#d7ae83",
            color: "#111111",
            fontSize: "1rem",
            fontWeight: 600,
            padding: "5px 15px",
            border: "none",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: "#666666",
              color: "#EDF6FF",
            },
          }}
        >
          Approve
        </Button>
        <Button onClick={() => handleStatusChange("Rejected")} sx={{
            backgroundColor: "#222222",
            color: "#EDF6FF",
            fontSize: "1rem",
            fontWeight: 600,
            padding: "5px 15px",
            border: "none",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: "#666666",
              color: "#EDF6FF",
            },
          }}>
          Reject
        </Button>
        {/* <Button onClick={handleClose}>Cancel</Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default LeaveStatus;
