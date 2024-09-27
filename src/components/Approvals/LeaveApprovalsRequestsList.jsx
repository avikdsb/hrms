import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { employeeData } from "../../constants/employeeData";
import { leaveData } from "../../constants/leavData";
import TakeActionOnLeaveApprovals from "./TakeAction";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: "Change density" } }}
      />
      <Box sx={{ flexGrow: 1 }} />

      <Box
        sx={{
          backgroundColor: "#111111",
          fontSize: "1rem",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <GridToolbarExport
          slotProps={{
            tooltip: { title: "Export data" },
            button: {
              variant: "outlined",

              sx: {
                color: "#D7AE83",
                fontSize: "12px",
                fontWeight: "500",
                border: "1px solid #111111",
                borderRadius: "5px",
                padding: "6px 12px",
                "&:hover": {
                  color: "#EDF6FF",
                  border: "1px solid #111111",
                },
              },
            },
          }}
        />
      </Box>
    </GridToolbarContainer>
  );
}

const LeaveApprovalRequestsList = () => {
  // The view button action
  // will be redirect to a new page
  // To see profile details
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleClickOpenProfile = (employee) => {
    setSelectedEmployee(employee);
    setOpenProfileDialog(true);
  };

  const handleCloseProfileDialog = () => {
    setOpenProfileDialog(false);
    setSelectedEmployee(null);
  };

  // To see the employee photo
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  // Prevent closing on the outside click of the image
  const handleDialogClose = (event, reason) => {
    if (reason !== "backdropClick") {
      handleClose();
    }
  };

  // Function to handle row selection manually via checkbox only
  const handleCheckboxClick = (params, event) => {
    if (event.target.closest(".MuiCheckbox-root")) {
      return;
    }
    event.stopPropagation();
  };

  // remove it from here for better code structure
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      cellClassName: "id-cell",
    },
    { field: "empId", headerName: "Emp ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-cell",
    },
    { field: "email", headerName: "Email ID", flex: 1 },
    { field: "leave_type", headerName: "Leave Type", flex: 1 },
    { field: "from", headerName: "From", flex: 1 },
    { field: "to", headerName: "To", flex: 1 },
    { field: "requested_date", headerName: "Request Date", flex: 1 },
    { field: "reason_for_leave", headerName: "Reason", flex: 1 },
    { field: "status", headerName: "Status", flex: 1, cellClassName: "status-cell" },
    { field: "comment", headerName: 'Comment', flex: 1, },
    { field: "action_taken_by", headerName: "Action Taken By", flex: 1 },
    {
      field: "take_action",
      headerName: "Take Action",
      flex: 1.4,
      renderCell: (params) => {
        const isApproved = params.row.status != 'pending'
        return (
          <div
            style={{
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <IconButton
              color="primary"
              // onClick={() => handleViewClick(params.row.id)}
              onClick={() => handleClickOpenProfile(params.row)}
              disabled={isApproved}
              sx={{
                backgroundColor: "#d7ae83",
                color: "#EDF6FF",
                "&:hover": {
                  backgroundColor: "#111111",
                  color: "#d7ae83",
                },
                borderRadius: "5px",
                height: "35px",
                padding: "0 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              {/* <VisibilityOutlinedIcon sx={{ fontSize: 22 }} /> */}
              <span style={{ fontSize: "14px", fontWeight: "500" }}>Action</span>
            </IconButton>
          </div>
        )
      },
    },
  ];

  return (
    <Box>
      <Box
        m="10px 0 0 0"
        height="75vh"
        sx={{
          ".MuiDataGrid-root": {
            margin: 0,
            padding: 0,
          },
          "& .MuiDataGrid-root": {
            border: "none",
            borderRadius: "12px",
            overflow: "hidden",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-cell": {
            color: "#d7ae83",
          },
          "& .id-cell": {
            color: "#d7ae83",
          },
          "& .role-cell": {
            color: "#d7ae83",
          },
          "& .status-cell": {
            color: "#d7ae83",
          },
          // Header Background Color
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#333333 !important",
          },

          // Header Title Color
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "#111111 !important",
          },

          // Header Title Separator Color
          "& .MuiDataGrid-columnSeparator": {
            // visibility: "hidden",
            color: "#999999 !important",
          },

          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#252525",
            color: "#EDF6FF",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#EDF6FF",
          },
          "& .MuiDataGrid-toolbarContainer": {
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor: "#e6ccb1",
            padding: "8px",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: "#111111",
          },

          // Checkbox Color
          "& .MuiCheckbox-root": {
            color: "#e6ccb1",
          },
          // After Checked Color
          "& .MuiCheckbox-root.Mui-checked": {
            color: "#e6ccb1",
          },
          "& .MuiCheckbox-root.MuiCheckbox-indeterminate": {
            color: "#e6ccb1",
            // backgroundColor: "#000000",
          },

          // Remove focus outline
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
            outline: "none !important",
          },
          // Remove row selection highlight
          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: "#505c66 !important",
          },
        }}
      >
        <DataGrid
          rows={leaveData}
          columns={columns}
          checkboxSelection
          onCellClick={handleCheckboxClick}
          {...employeeData}
          slots={{
            toolbar: CustomToolbar,
          }}
          sx={{
            width: "100%",
            minWidth: "1150px",
            overflowX: "auto",
          }}
        />
      </Box>

      <TakeActionOnLeaveApprovals
        open={openProfileDialog}
        handleClose={handleCloseProfileDialog}
        employee={selectedEmployee}
      />
    </Box>
  );
};

export default LeaveApprovalRequestsList;
