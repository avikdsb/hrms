import React, { useState } from "react";
import { Box, Dialog, DialogContent, IconButton } from "@mui/material";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { employeeData } from "../../constants/employeeData";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ViewProfile from "./viewProfile";

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

const EmployeeList = () => {
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

  const handleClickOpen = (imgSrc) => {
    setCurrentImage(imgSrc);
    setOpen(true);
  };

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

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      cellClassName: "id-cell",
    },
    {
      field: "image",
      headerName: "Photo",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={params.value}
            alt="Product"
            style={{
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              overflow: "hidden",
              cursor: "pointer",
              objectFit: "contain",
              backgroundColor: "#999999",
            }}
            onClick={() => handleClickOpen(params.value)}
          />
        </div>
      ),
      headerAlign: "left",
      align: "left",
      // Add this flag to exclude the image column during export
      disableExport: true,
    },
    { field: "empId", headerName: "Emp ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-cell",
    },
    { field: "dob", headerName: "D.O.B.", flex: 1 },
    {
      field: "phone",
      headerName: "Phone Number",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    { field: "email", headerName: "Email ID", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "role", headerName: "Role", flex: 1, cellClassName: "role-cell" },
    { field: "doj", headerName: "D.O.J.", flex: 1 },
    { field: "rept1", headerName: "Reporting 1", flex: 1 },
    { field: "rept2", headerName: "Reporting 2", flex: 1 },
    { field: "assetId", headerName: "Asset ID", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      cellClassName: "status-cell",
    },

    // To show the employee details and
    // edit, modify or delete employee action will perform that page

    {
      field: "details",
      headerName: "Details",
      flex: 1.4,
      renderCell: (params) => (
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
            <VisibilityOutlinedIcon sx={{ fontSize: 22 }} />
            <span style={{ fontSize: "14px", fontWeight: "500" }}>View</span>
          </IconButton>
        </div>
      ),
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
          rows={employeeData}
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
      <Dialog
        open={open}
        // onClose={handleClose}
        onClose={handleDialogClose}
        maxWidth="md"
        PaperProps={{
          style: {
            backgroundColor: "#333333",
            borderRadius: "20px",
            boxShadow: "none",
            position: "relative",
          },
        }}
      >
        {/* Cross Icon to Close the Image */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "#EDF6FF",
            // hex - #ffffff1a
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            "&:hover": {
              // hex - #ffffff4d
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              // hex - #0000004d
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <CloseOutlinedIcon />
        </IconButton>
        <DialogContent
          style={{
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={currentImage}
            alt="Expanded"
            style={{
              width: "500px",
              height: "500px",
              objectFit: "contain",
              borderRadius: "20px",
            }}
            // onClick={handleClose}
          />
        </DialogContent>
      </Dialog>

      <ViewProfile
        open={openProfileDialog}
        handleClose={handleCloseProfileDialog}
        employee={selectedEmployee}
      />
    </Box>
  );
};

export default EmployeeList;
