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
import { totalAssetsData } from "../../constants/employeeData";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

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

const TotalAssetsDetails = () => {
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
      type: "number",
      flex: 0.5,
      cellClassName: "id-cell",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "assetType",
      headerName: "Asset Type",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "totalStock",
      headerName: "Total Stock",
      type: "number",
      flex: 1,
      cellClassName: "total-stock-cell",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "stockAddedDate",
      headerName: "Stock Added Date",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "availableStock",
      headerName: "Available Stock",
      type: "number",
      flex: 1,
      cellClassName: "available-stock-cell",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "stockUpdatedDate",
      headerName: "Stock Updated Date",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "image",
      headerName: "Product Image",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
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
  ];

  return (
    <Box>
      <Box
        m="10px 0 0 0"
        height="75vh"
        sx={{
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
          id="data-grid-table"
          rows={totalAssetsData}
          columns={columns}
          checkboxSelection
          onCellClick={handleCheckboxClick}
          {...totalAssetsData}
          slots={{
            toolbar: CustomToolbar,
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
    </Box>
  );
};

export default TotalAssetsDetails;
