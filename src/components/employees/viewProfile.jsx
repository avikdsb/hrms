import React, { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Button,
  useMediaQuery,
  FormHelperText,
  Checkbox,
  Chip,
  Autocomplete,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  MenuItem,
  Select,
  InputLabel,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Formik, Form } from "formik";
import { assetsData, employeeData } from "../../constants/employeeData";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const ViewProfile = ({ open, handleClose, employee }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [isEditing, setIsEditing] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // Prevent closing the dialog on backdrop click
  const handleDialogClose = (event, reason) => {
    if (reason !== "backdropClick") {
      handleClose();
    }
  };

  // Edit Button Click
  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle update action
  const handleUpdateClick = (values) => {
    setIsEditing(false);
    console.log("Updated Employee Data:", values);
  };

  useEffect(() => {
    if (!open) {
      setIsEditing(false); // Reset edit mode when dialog is closed
    }
  }, [open]);

  // Delete Button Click
  // Handle opening the delete confirmation dialog
  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  // Confirm deletion
  const handleDeleteConfirm = () => {
    // Perform the delete action here
    console.log("Deleted");
    setOpenDeleteDialog(false);
    handleClose();
  };

  // Cancel the delete action
  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <Dialog
      open={open}
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
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogContent
        style={{
          padding: "40px 20px 20px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          position: "relative",
        }}
      >
        <span
          className={`font-title text-[#EDF6FF] flex justify-center items-center text-[1.5rem] mb-[1.5rem]`}
        >
          {isEditing ? "Update Employee Details" : "Employee Details"}
        </span>
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
        <Formik
          initialValues={employee || {}}
          onSubmit={(values) => handleUpdateClick(values)}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" gap="20px">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  gap="10px"
                >
                  {/* Left: Image */}
                  <Box flex="1" display="flex" justifyContent="center">
                    <img
                      src={values.empPhoto || ""}
                      alt="Profile"
                      style={{
                        width: "300px",
                        height: "130px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        backgroundColor: "#999999",
                      }}
                    />
                  </Box>

                  <Box
                    flex="2"
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                  >
                    <TextField
                      fullWidth
                      size="small"
                      variant="filled"
                      type="number"
                      label="Employee ID"
                      name="empId"
                      onChange={handleChange}
                      value={values.empId || ""}
                      slotProps={{
                        input: {
                          readOnly: !isEditing,

                          style: {
                            color: "#EDF6FF",
                            backgroundColor: "#282828",
                            borderRadius: "0.5rem",
                            borderWidth: "0.1rem",
                            borderColor: "#D7AE83",
                            outline: "none",
                          },
                        },
                        inputLabel: {
                          style: {
                            color: "#999999",
                          },
                        },
                      }}
                      sx={{
                        // Remove the underline
                        "& .MuiFilledInput-root": {
                          "&:before": {
                            borderBottom: "none !important",
                          },
                          "&:hover:before": {
                            borderBottom: "none !important",
                          },
                          "&:after": {
                            borderBottom: "none !important",
                          },
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      variant="filled"
                      type="number"
                      label="Phone Number"
                      name="empPhone"
                      onChange={handleChange}
                      value={values.empPhone || ""}
                      slotProps={{
                        input: {
                          readOnly: !isEditing,

                          style: {
                            color: "#EDF6FF",
                            backgroundColor: "#282828",
                            borderRadius: "0.5rem",
                            borderWidth: "0.1rem",
                            borderColor: "#D7AE83",
                            outline: "none",
                          },
                        },
                        inputLabel: {
                          style: {
                            color: "#999999",
                          },
                        },
                      }}
                      sx={{
                        // Remove the underline
                        "& .MuiFilledInput-root": {
                          "&:before": {
                            borderBottom: "none !important",
                          },
                          "&:hover:before": {
                            borderBottom: "none !important",
                          },
                          "&:after": {
                            borderBottom: "none !important",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Right: Employee Name and below that Phone */}
                  <Box
                    flex="2"
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                  >
                    <TextField
                      fullWidth
                      size="small"
                      variant="filled"
                      type="text"
                      label="Full Name"
                      name="empName"
                      onChange={handleChange}
                      value={values.empName || ""}
                      slotProps={{
                        input: {
                          readOnly: !isEditing,

                          style: {
                            color: "#EDF6FF",
                            backgroundColor: "#282828",
                            borderRadius: "0.5rem",
                            borderWidth: "0.1rem",
                            borderColor: "#D7AE83",
                            outline: "none",
                          },
                        },
                        inputLabel: {
                          style: {
                            color: "#999999",
                          },
                        },
                      }}
                      sx={{
                        // Remove the underline
                        "& .MuiFilledInput-root": {
                          "&:before": {
                            borderBottom: "none !important",
                          },
                          "&:hover:before": {
                            borderBottom: "none !important",
                          },
                          "&:after": {
                            borderBottom: "none !important",
                          },
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      variant="filled"
                      type="email"
                      label="Email ID"
                      name="empEmail"
                      onChange={handleChange}
                      value={values.empEmail || ""}
                      slotProps={{
                        input: {
                          readOnly: !isEditing,

                          style: {
                            color: "#EDF6FF",
                            backgroundColor: "#282828",
                            borderRadius: "0.5rem",
                            borderWidth: "0.1rem",
                            borderColor: "#D7AE83",
                            outline: "none",
                          },
                        },
                        inputLabel: {
                          style: {
                            color: "#999999",
                          },
                        },
                      }}
                      sx={{
                        // Remove the underline
                        "& .MuiFilledInput-root": {
                          "&:before": {
                            borderBottom: "none !important",
                          },
                          "&:hover:before": {
                            borderBottom: "none !important",
                          },
                          "&:after": {
                            borderBottom: "none !important",
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Bottom Section: Other fields in column view */}

                <TextField
                  fullWidth
                  size="small"
                  variant="filled"
                  type="text"
                  label="Permanent Address"
                  name="empPermanentAddress"
                  onChange={handleChange}
                  value={values.empPermanentAddress || ""}
                  slotProps={{
                    input: {
                      readOnly: !isEditing,

                      style: {
                        color: "#EDF6FF",
                        backgroundColor: "#282828",
                        borderRadius: "0.5rem",
                        borderWidth: "0.1rem",
                        borderColor: "#D7AE83",
                        outline: "none",
                      },
                    },
                    inputLabel: {
                      style: {
                        color: "#999999",
                      },
                    },
                  }}
                  sx={{
                    // Remove the underline
                    "& .MuiFilledInput-root": {
                      "&:before": {
                        borderBottom: "none !important",
                      },
                      "&:hover:before": {
                        borderBottom: "none !important",
                      },
                      "&:after": {
                        borderBottom: "none !important",
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  size="small"
                  variant="filled"
                  type="text"
                  label="Current Address"
                  name="empCurrentAddress"
                  onChange={handleChange}
                  value={values.empCurrentAddress || ""}
                  slotProps={{
                    input: {
                      readOnly: !isEditing,

                      style: {
                        color: "#EDF6FF",
                        backgroundColor: "#282828",
                        borderRadius: "0.5rem",
                        borderWidth: "0.1rem",
                        borderColor: "#D7AE83",
                        outline: "none",
                      },
                    },
                    inputLabel: {
                      style: {
                        color: "#999999",
                      },
                    },
                  }}
                  sx={{
                    // Remove the underline
                    "& .MuiFilledInput-root": {
                      "&:before": {
                        borderBottom: "none !important",
                      },
                      "&:hover:before": {
                        borderBottom: "none !important",
                      },
                      "&:after": {
                        borderBottom: "none !important",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  size="small"
                  variant="filled"
                  type="number"
                  label="Aadhaar ID"
                  name="empAadhaarId"
                  onChange={handleChange}
                  value={values.empAadhaarId || ""}
                  slotProps={{
                    input: {
                      readOnly: !isEditing,

                      style: {
                        color: "#EDF6FF",
                        backgroundColor: "#282828",
                        borderRadius: "0.5rem",
                        borderWidth: "0.1rem",
                        borderColor: "#D7AE83",
                        outline: "none",
                      },
                    },
                    inputLabel: {
                      style: {
                        color: "#999999",
                      },
                    },
                  }}
                  sx={{
                    // Remove the underline
                    "& .MuiFilledInput-root": {
                      "&:before": {
                        borderBottom: "none !important",
                      },
                      "&:hover:before": {
                        borderBottom: "none !important",
                      },
                      "&:after": {
                        borderBottom: "none !important",
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  size="small"
                  variant="filled"
                  type="text"
                  label="Pan ID"
                  name="empPanId"
                  onChange={handleChange}
                  value={values.empPanId || ""}
                  slotProps={{
                    input: {
                      readOnly: !isEditing,

                      style: {
                        color: "#EDF6FF",
                        backgroundColor: "#282828",
                        borderRadius: "0.5rem",
                        borderWidth: "0.1rem",
                        borderColor: "#D7AE83",
                        outline: "none",
                      },
                    },
                    inputLabel: {
                      style: {
                        color: "#999999",
                      },
                    },
                  }}
                  sx={{
                    // Remove the underline
                    "& .MuiFilledInput-root": {
                      "&:before": {
                        borderBottom: "none !important",
                      },
                      "&:hover:before": {
                        borderBottom: "none !important",
                      },
                      "&:after": {
                        borderBottom: "none !important",
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  size="small"
                  variant="filled"
                  type="date"
                  label="Date of Birth"
                  name="empDob"
                  onChange={handleChange}
                  value={values.empDob || ""}
                  slotProps={{
                    input: {
                      readOnly: !isEditing,

                      style: {
                        color: "#EDF6FF",
                        backgroundColor: "#282828",
                        borderRadius: "0.5rem",
                        borderWidth: "0.1rem",
                        borderColor: "#D7AE83",
                        outline: "none",
                      },
                    },
                    inputLabel: {
                      style: {
                        color: "#999999",
                      },
                    },
                  }}
                  sx={{
                    // Remove the underline
                    "& .MuiFilledInput-root": {
                      "&:before": {
                        borderBottom: "none !important",
                      },
                      "&:hover:before": {
                        borderBottom: "none !important",
                      },
                      "&:after": {
                        borderBottom: "none !important",
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  size="small"
                  variant="filled"
                  type="date"
                  label="Date of Joining"
                  name="empDoj"
                  onChange={handleChange}
                  value={values.empDoj || ""}
                  slotProps={{
                    input: {
                      readOnly: !isEditing,

                      style: {
                        color: "#EDF6FF",
                        backgroundColor: "#282828",
                        borderRadius: "0.5rem",
                        borderWidth: "0.1rem",
                        borderColor: "#D7AE83",
                        outline: "none",
                      },
                    },
                    inputLabel: {
                      style: {
                        color: "#999999",
                      },
                    },
                  }}
                  sx={{
                    // Remove the underline
                    "& .MuiFilledInput-root": {
                      "&:before": {
                        borderBottom: "none !important",
                      },
                      "&:hover:before": {
                        borderBottom: "none !important",
                      },
                      "&:after": {
                        borderBottom: "none !important",
                      },
                    },
                  }}
                />

                <Box display="flex" flexDirection="column" gap="10px">
                  <TextField
                    fullWidth
                    size="small"
                    variant="filled"
                    type="text"
                    label="Department"
                    name="empDepartment"
                    onChange={handleChange}
                    value={values.empDepartment || ""}
                    slotProps={{
                      input: {
                        readOnly: !isEditing,

                        style: {
                          color: "#EDF6FF",
                          backgroundColor: "#282828",
                          borderRadius: "0.5rem",
                          borderWidth: "0.1rem",
                          borderColor: "#D7AE83",
                          outline: "none",
                        },
                      },
                      inputLabel: {
                        style: {
                          color: "#999999",
                        },
                      },
                    }}
                    sx={{
                      // Remove the underline
                      "& .MuiFilledInput-root": {
                        "&:before": {
                          borderBottom: "none !important",
                        },
                        "&:hover:before": {
                          borderBottom: "none !important",
                        },
                        "&:after": {
                          borderBottom: "none !important",
                        },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    variant="filled"
                    type="text"
                    label="Designation"
                    name="empDesignation"
                    onChange={handleChange}
                    value={values.empDesignation || ""}
                    slotProps={{
                      input: {
                        readOnly: !isEditing,

                        style: {
                          color: "#EDF6FF",
                          backgroundColor: "#282828",
                          borderRadius: "0.5rem",
                          borderWidth: "0.1rem",
                          borderColor: "#D7AE83",
                          outline: "none",
                        },
                      },
                      inputLabel: {
                        style: {
                          color: "#999999",
                        },
                      },
                    }}
                    sx={{
                      // Remove the underline
                      "& .MuiFilledInput-root": {
                        "&:before": {
                          borderBottom: "none !important",
                        },
                        "&:hover:before": {
                          borderBottom: "none !important",
                        },
                        "&:after": {
                          borderBottom: "none !important",
                        },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    variant="filled"
                    type="number"
                    label="Grade"
                    name="empGrade"
                    onChange={handleChange}
                    value={values.empGrade || ""}
                    slotProps={{
                      input: {
                        readOnly: !isEditing,

                        style: {
                          color: "#EDF6FF",
                          backgroundColor: "#282828",
                          borderRadius: "0.5rem",
                          borderWidth: "0.1rem",
                          borderColor: "#D7AE83",
                          outline: "none",
                        },
                      },
                      inputLabel: {
                        style: {
                          color: "#999999",
                        },
                      },
                    }}
                    sx={{
                      // Remove the underline
                      "& .MuiFilledInput-root": {
                        "&:before": {
                          borderBottom: "none !important",
                        },
                        "&:hover:before": {
                          borderBottom: "none !important",
                        },
                        "&:after": {
                          borderBottom: "none !important",
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    variant="filled"
                    type="text"
                    label="Role"
                    name="empRole"
                    onChange={handleChange}
                    value={values.empRole || ""}
                    slotProps={{
                      input: {
                        readOnly: !isEditing,

                        style: {
                          color: "#EDF6FF",
                          backgroundColor: "#282828",
                          borderRadius: "0.5rem",
                          borderWidth: "0.1rem",
                          borderColor: "#D7AE83",
                          outline: "none",
                        },
                      },
                      inputLabel: {
                        style: {
                          color: "#999999",
                        },
                      },
                    }}
                    sx={{
                      // Remove the underline
                      "& .MuiFilledInput-root": {
                        "&:before": {
                          borderBottom: "none !important",
                        },
                        "&:hover:before": {
                          borderBottom: "none !important",
                        },
                        "&:after": {
                          borderBottom: "none !important",
                        },
                      },
                    }}
                  />

                  {/* Reporting 1 Dropdown */}

                  <FormControl
                    fullWidth
                    size="small"
                    variant="filled"
                    required
                    error={!!touched.empReporting1 && !!errors.empReporting1}
                  >
                    <InputLabel style={{ color: "#999999" }} id="assets-label">
                      Reporting 1
                    </InputLabel>
                    <Select
                      labelId="reporting1-label"
                      name="empReporting1"
                      value={values.empReporting1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      displayEmpty
                      style={{
                        color: "#EDF6FF",
                        backgroundColor: "#282828",
                        borderRadius: "0.5rem",
                        borderWidth: "0.1rem",
                        borderColor: "#D7AE83",
                        outline: "none",
                      }}
                      sx={{
                        // Custom styles
                        "& .MuiSelect-icon": {
                          color: "#999999",
                        },
                        "& .MuiSelect-select": {
                          color: "#EDF6FF !important",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#D7AE83",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#D7AE83",
                        },
                        "&.Mui-disabled": {
                          color: "#EDF6FF !important",
                          backgroundColor: "#282828",
                          borderColor: "#D7AE83",
                          "& .MuiSelect-icon": {
                            color: "#999999",
                          },
                          "& .MuiSelect-select": {
                            color: "#EDF6FF !important",
                          },
                          "& .MuiSelect-select.Mui-disabled": {
                            color: "#EDF6FF !important",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#D7AE83 !important",
                          },
                          "&::before": {
                            borderBottom: "none !important",
                          },
                          "&::after": {
                            borderBottom: "none !important",
                          },
                        },
                        "&::before": {
                          borderBottom: "none",
                        },
                        "&::after": {
                          borderBottom: "none",
                        },
                        "&:hover:not(.Mui-disabled)::before": {
                          borderBottom: "none",
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          // Dropdown panel style
                          sx: {
                            bgcolor: "#282828",
                            "& .MuiMenuItem-root": {
                              color: "#EDF6FF",
                              "&:hover": {
                                bgcolor: "#D7AE83",
                              },
                            },
                          },
                        },
                      }}
                      disabled={!isEditing}
                    >
                      {/* <MenuItem value="" disabled>
                        Select One
                      </MenuItem> */}
                      {employeeData.map((employee) => (
                        <MenuItem
                          key={employee.empName}
                          value={employee.empName}
                        >
                          {employee.empName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {touched.empReporting1 && errors.empReporting1}
                    </FormHelperText>
                  </FormControl>

                  {/* Reporting 2 Dropdown */}

                  <FormControl
                    fullWidth
                    size="small"
                    variant="filled"
                    required
                    error={!!touched.empReporting2 && !!errors.empReporting2}
                  >
                    <InputLabel style={{ color: "#999999" }} id="assets-label">
                      Reporting 2
                    </InputLabel>
                    <Select
                      labelId="reporting2-label"
                      name="empReporting2"
                      value={values.empReporting2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      displayEmpty
                      style={{
                        color: "#EDF6FF !important",
                        backgroundColor: "#282828",
                        borderRadius: "0.5rem",
                        borderWidth: "0.1rem",
                        borderColor: "#D7AE83",
                        outline: "none",
                      }}
                      sx={{
                        // Custom styles
                        // Dropdown icon color
                        "& .MuiSelect-icon": {
                          color: "#999999",
                        },
                        "& .MuiSelect-select": {
                          color: "#EDF6FF !important",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#D7AE83",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#D7AE83",
                        },
                        // Colors when disabled
                        "&.Mui-disabled": {
                          color: "#EDF6FF !important",
                          backgroundColor: "#282828",
                          borderColor: "#D7AE83",
                          "& .MuiSelect-icon": {
                            color: "#999999",
                          },
                          "& .MuiSelect-select": {
                            color: "#EDF6FF !important",
                          },
                          "& .MuiSelect-select.Mui-disabled": {
                            color: "#EDF6FF !important",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#D7AE83 !important",
                          },
                          "&::before": {
                            borderBottom: "none !important",
                          },
                          "&::after": {
                            borderBottom: "none !important",
                          },
                        },
                        "&::before": {
                          borderBottom: "none",
                        },
                        "&::after": {
                          borderBottom: "none",
                        },
                        "&:hover:not(.Mui-disabled)::before": {
                          borderBottom: "none",
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          // Dropdown panel style
                          sx: {
                            bgcolor: "#282828",
                            "& .MuiMenuItem-root": {
                              color: "#EDF6FF",
                              "&:hover": {
                                bgcolor: "#D7AE83",
                              },
                            },
                          },
                        },
                      }}
                      disabled={!isEditing}
                    >
                      {/* <MenuItem value="" disabled>
                        Select One
                      </MenuItem> */}
                      {employeeData.map((employee) => (
                        <MenuItem
                          key={employee.empName}
                          value={employee.empName}
                        >
                          {employee.empName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {touched.empReporting2 && errors.empReporting2}
                    </FormHelperText>
                  </FormControl>

                  {/* Asset Dropdown */}
                  {/* Searchable and Multi Check Dropdown Button */}

                  <FormControl
                    fullWidth
                    size="small"
                    variant="filled"
                    required
                    error={!!touched.empAssets && !!errors.empAssets}
                  >
                    <Autocomplete
                      id="assets-autocomplete"
                      multiple
                      size="small"
                      options={assetsData}
                      getOptionLabel={(option) => option.assetId}
                      onChange={(event, value) => {
                        // Set the selected values to the form's field
                        setFieldValue(
                          "assets",
                          value.map((item) => item.assetId)
                        );
                      }}
                      onBlur={handleBlur}
                      value={
                        (values.assets || []).map((assetId) =>
                          assetsData.find((asset) => asset.assetId === assetId)
                        ) || []
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Assets"
                          fullWidth
                          variant="filled"
                          style={{
                            backgroundColor: "#282828",
                            borderRadius: "0.5rem",
                          }}
                          sx={{
                            // Text field input styles
                            "& .MuiFilledInput-root": {
                              color: "#EDF6FF",
                              backgroundColor: "#282828",
                              borderRadius: "0.5rem",
                              border: "0.1rem solid #D7AE83",

                              // Remove the underline

                              "&:before": {
                                borderBottom: "none !important",
                              },
                              "&:hover:before": {
                                borderBottom: "none !important",
                              },
                              "&:after": {
                                borderBottom: "none !important",
                              },
                            },
                            // Label styles
                            "& .MuiInputLabel-root": {
                              color: "#999999 !important",
                            },
                            // Dropdown and Cross Icon styles
                            "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root":
                              {
                                color: "#999999",
                              },
                            "& .MuiAutocomplete-clearIndicator": {
                              color: "#999999",
                            },
                          }}
                        />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            label={option.assetId}
                            {...getTagProps({ index })}
                            // Styles for selected chips
                            style={{
                              backgroundColor: "#D7AE83",
                              color: "#EDF6FF",
                              margin: "2px",
                              padding: "0px",
                              fontSize: "0.8rem",
                              borderRadius: "0.3rem",
                            }}
                            deleteIcon={
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "12px",
                                  height: "12px",
                                  // backgroundColor: "#777777",
                                  borderRadius: "50%",
                                  padding: "5px",
                                  marginLeft: "0px",
                                  boxSizing: "content-box",
                                }}
                              >
                                <CancelOutlinedIcon
                                  style={{
                                    color: "#000000",
                                    paddingRight: "2px",
                                  }}
                                />
                              </span>
                            }
                          />
                        ))
                      }
                      renderOption={(props, option, { selected }) => (
                        <li
                          {...props}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "left",
                            // backgroundColor: selected ? "#111111" : "transparent",
                            // color: selected ? "#D7AE83" : "#EDF6FF",
                          }}
                        >
                          <Checkbox
                            checked={selected}
                            style={{
                              marginRight: 1,
                              color: "#EDF6FF",
                            }} // Checkbox color
                          />
                          {option.assetId}
                        </li>
                      )}
                      slotProps={{
                        paper: {
                          // Dropdown panel style
                          sx: {
                            bgcolor: "#282828",
                            "& .MuiAutocomplete-option": {
                              color: "#EDF6FF",
                              "&:hover": {
                                bgcolor: "#D7AE83 !important",
                              },
                            },
                            "& .MuiAutocomplete-noOptions": {
                              color: "#EDF6FF !important",
                            },
                          },
                        },
                        popper: {
                          sx: {
                            "& .MuiAutocomplete-popupIndicator": {
                              color: "#D7AE83",
                            },
                          },
                        },
                      }}
                      // Custom text for no options available in the dropdown
                      noOptionsText="Asset Not Found"
                    />
                    <FormHelperText>
                      {touched.empAssets && errors.empAssets}
                    </FormHelperText>
                  </FormControl>

                  {/* Status Radio Buttons */}
                  <FormControl
                    component="fieldset"
                    size="small"
                    error={!!touched.status && !!errors.status}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#999999",
                      backgroundColor: "#282828",
                      borderRadius: "0.5rem",
                      border: "0.1rem solid #D7AE83",
                      padding: "0.5rem",
                    }}
                  >
                    <div className="flex flex-row justify-start border-[#D7AE83] items-center w-full gap-10 pl-1">
                      <h5
                        component="legend"
                        sx={{
                          color: "#999999",
                        }}
                      >
                        Status
                      </h5>
                      <RadioGroup
                        aria-label="status"
                        name="status"
                        // value={values.status}
                        value={values.status || ""}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "start",
                          alignItems: "center",
                          // Label color
                          "& .MuiFormControlLabel-root": {
                            color: "#EDF6FF",
                          },
                          "& .MuiRadio-root": {
                            // Unchecked radio button color
                            color: "#D7AE83",
                            // Checked radio button color
                            "&.Mui-checked": {
                              color: "#D7AE83",
                            },
                            // Color for disabled radio button
                            "&.Mui-disabled": {
                              color: "#D7AE83",
                            },
                          },
                          // Color for disabled label
                          "& .MuiFormControlLabel-label.Mui-disabled": {
                            color: "#999999 !important",
                          },
                        }}
                      >
                        <FormControlLabel
                          value="Active"
                          control={<Radio />}
                          label="Active"
                          disabled={!isEditing}
                        />
                        <FormControlLabel
                          value="Inactive"
                          control={<Radio />}
                          label="Inactive"
                          disabled={!isEditing}
                        />
                      </RadioGroup>
                    </div>

                    <FormHelperText>
                      {touched.status && errors.status}
                    </FormHelperText>
                  </FormControl>

                  {/* End Of Status Radio Button Section */}
                </Box>
              </Box>

              <Box display="flex" justifyContent="space-between" mt={4} gap={5}>
                {/* Delete Button */}
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleDeleteClick}
                  sx={{
                    backgroundColor: "#d7ae83",
                    color: "#111111",
                    fontSize: "1rem",
                    fontWeight: 600,
                    padding: "5px 15px",
                    border: "none",
                    borderRadius: "5px",
                    "&:hover": {
                      backgroundColor: "#111111",
                      color: "#EDF6FF",
                    },
                  }}
                >
                  Delete
                </Button>

                {/* Edit and Update Button */}
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => {
                    if (isEditing) {
                      // Submit form if editing
                      handleSubmit();
                    } else {
                      // Toggle edit mode
                      handleEditClick();
                    }
                  }}
                  sx={{
                    backgroundColor: isEditing ? "#d7ae83" : "#EDF6FF",
                    color: "#111111",
                    fontSize: "1rem",
                    fontWeight: 600,
                    padding: "5px 15px",
                    border: "none",
                    borderRadius: "5px",
                    "&:hover": {
                      backgroundColor: isEditing ? "#81684f" : "#666666",
                      color: "#EDF6FF",
                    },
                  }}
                >
                  {isEditing ? "Update" : "Edit"}
                </Button>
              </Box>

              {/* Delete Confirmation Dialog */}
              <Dialog
                open={openDeleteDialog}
                onClose={handleDeleteCancel}
                PaperProps={{
                  sx: {
                    borderRadius: "1rem",
                    backgroundColor: "#333333",
                    padding: "2rem",
                    display: "flex",
                  },
                }}
              >
                <DialogTitle
                  sx={{
                    color: "#EDF6FF",
                    padding: "0px",
                    marginBottom: "1.5rem",
                  }}
                >
                  Delete Employee
                </DialogTitle>
                <DialogContent sx={{ padding: "0px", marginBottom: "1.5rem" }}>
                  <DialogContentText sx={{ color: "#EDF6FF !important" }}>
                    {employee ? (
                      <>
                        Please confirm if you wish to delete the data for
                        employee{" "}
                        <span className="font-bold text-[#d7ae83]">
                          {employee.name}
                        </span>
                        .
                        <br />
                        This operation is irreversible and will remove all
                        associated information.
                      </>
                    ) : (
                      "No employee selected for deletion."
                    )}
                  </DialogContentText>
                </DialogContent>
                <DialogActions className="gap-5" sx={{ padding: "4px 0px" }}>
                  <Button
                    onClick={handleDeleteCancel}
                    sx={{
                      color: "#EDF6FF",
                      backgroundColor: "#212121",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      "&:hover": {
                        color: "#13f702",
                        backgroundColor: "#111111",
                        borderRadius: "5px",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteConfirm}
                    sx={{
                      color: "#EDF6FF",
                      backgroundColor: "#212121",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      "&:hover": {
                        color: "#f70202",
                        backgroundColor: "#111111",
                        borderRadius: "5px",
                      },
                    }}
                  >
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProfile;

// gray: {
//     100: "#f7efe6",
//     200: "#efdfcd",
//     300: "#e7ceb5",
//     400: "#dfbe9c",
//     500: "#d7ae83",
//     600: "#ac8b69",
//     700: "#81684f",
//     800: "#564634",
//     900: "#2b231a"
// },
