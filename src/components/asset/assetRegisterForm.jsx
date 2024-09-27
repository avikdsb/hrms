import {
  Button,
  TextField,
  FormControl,
  FormHelperText,
  Autocomplete,
  Checkbox,
  Chip,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { employeeData } from "../../constants/employeeData";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const initialValues = {
  assetId: "",
  assetType: "",
  brandName: "",
  serialNumber: "",
  dop: "",
  empId: "",
};

const userSchema = yup.object().shape({
  assetId: yup.string().required("required"),
  assetType: yup.string().required("required"),
  brandName: yup.string().required("required"),
  serialNumber: yup.string().required("required"),
  dop: yup.date().required("required"),
  empId: yup.number(),
});

const AssetRegisterForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="text-[#EDF6FF] font-subtitle m-4">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
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
          <form onSubmit={handleSubmit}>
            <div
              className={`grid gap-5 ${
                isNonMobile ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {/* Form Text Fields */}

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Asset ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.assetId}
                name="assetId"
                error={!!touched.assetId && !!errors.assetId}
                helperText={touched.assetId && errors.assetId}
                slotProps={{
                  input: {
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
                variant="filled"
                type="text"
                label="Asset Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.assetType}
                name="assetType"
                error={!!touched.assetType && !!errors.assetType}
                helperText={touched.assetType && errors.assetType}
                slotProps={{
                  input: {
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
                variant="filled"
                type="text"
                label="Brand Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.brandName}
                name="brandName"
                error={!!touched.brandName && !!errors.brandName}
                helperText={touched.brandName && errors.brandName}
                slotProps={{
                  input: {
                    style: {
                      color: "white",
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
                variant="filled"
                type="text"
                label="Serial Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.serialNumber}
                name="serialNumber"
                error={!!touched.serialNumber && !!errors.serialNumber}
                helperText={touched.serialNumber && errors.serialNumber}
                slotProps={{
                  input: {
                    style: {
                      color: "white",
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
                variant="filled"
                type="text"
                label="Date of Purchase"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dop}
                name="dop"
                error={!!touched.dop && !!errors.dop}
                helperText={touched.dop && errors.dop}
                slotProps={{
                  input: {
                    style: {
                      color: "white",
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

              {/* Searchable Employee Id and Name */}

              <FormControl
                fullWidth
                variant="filled"
                required
                error={!!touched.employees && !!errors.employees}
              >
                <Autocomplete
                  id="employees-autocomplete"
                  multiple
                  options={employeeData}
                  getOptionLabel={(option) => option.empId}
                  onChange={(event, value) => {
                    // Set the selected values to the form's field
                    setFieldValue(
                      "employees",
                      value.map((item) => item.empId)
                    );
                  }}
                  onBlur={handleBlur}
                  value={
                    (values.employees || []).map((empId) =>
                      employeeData.find((employee) => employee.empId === empId)
                    ) || []
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Assign to an Employee"
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
                        "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root": {
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
                        label={option.empId}
                        {...getTagProps({ index })}
                        style={{
                          // Background color for selected chips
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
                              style={{ color: "#000000", paddingRight: "2px" }}
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
                        }}
                      />
                      {option.empId}
                    </li>
                  )}
                  slotProps={{
                    paper: {
                      sx: {
                        // Dropdown panel style
                        bgcolor: "#282828",
                        "& .MuiAutocomplete-option": {
                          color: "white",
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
                  noOptionsText="Employee Not Found"
                />
                <FormHelperText>
                  {touched.employees && errors.employees}
                </FormHelperText>
              </FormControl>
            </div>

            {/* Button Section */}
            <div className="flex justify-center items-center mt-[3rem]">
              <Button
                type="submit"
                sx={{
                  color: "#111111",
                  backgroundColor: "#D7AE83",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 2rem",
                  letterSpacing: "0.2rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  "&:hover": {
                    backgroundColor: "#363636",
                    color: "#D7AE83",
                  },
                }}
              >
                Register Asset
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AssetRegisterForm;
