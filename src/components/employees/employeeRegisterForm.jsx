import {
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Checkbox,
  Chip,
  Box,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { assetsData, employeeData } from "../../constants/employeeData";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { rolesListData } from "../../constants/roleManagementData";

const initialValues = {
  empPhoto: null,
  empId: "",
  empName: "",
  empPhone: "",
  empEmail: "",
  empPermanentAddress: "",
  empCurrentAddress: "",
  empAadhaarId: "",
  empPanId: "",
  empDob: "",
  empDoj: new Date().toISOString().split("T")[0],
  empDepartment: "",
  empDesignation: "",
  empGrade: "",
  // role data will fetch from role section
  // dropdown button
  empRole: "",
  // dropdown button
  empReporting1: "",
  empReporting2: "",
  // assets data will fetch from asset section
  // dropdown button
  empAssets: "",
  // radio button
  empStatus: "active",
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
  empPhoto: yup
    .mixed()
    .required("Employee photo is required")
    .test(
      "fileSize",
      "File too large",
      (value) => !value || (value && value.size <= 2000000)
    ) // 2MB limit
    .test(
      "fileType",
      "Unsupported File Format",
      (value) => !value || ["image/jpeg", "image/png"].includes(value.type)
    ),

  empId: yup.number().required("required"),
  empName: yup.string().required("required"),
  empPhone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  empEmail: yup.string().email("invalid email").required("required"),
  empPermanentAddress: yup.string().required("required"),
  empCurrentAddress: yup.string().required("required"),
  empAadhaarId: yup.number().required("required"),
  empPanId: yup.string().required("required"),
  empDob: yup
    .date()
    .max(new Date(), "Date of birth can't be in the future.")
    .required("Date of birth is mandatory.")
    .test("is-18+", "Employee must be at least 18 years old", (value) => {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      // Adjust the age if the birthday hasn't occurred yet this year
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        return age > 18;
      }
      return age >= 18;
    }),

  empDoj: yup
    .string()
    .required("required")
    .test("is-current-date", "Date must be today's date only", (value) => {
      const selectedDate = new Date(value).toISOString().split("T")[0];
      const todayDate = new Date().toISOString().split("T")[0];
      return selectedDate === todayDate;
    }),

  empDepartment: yup.string().required("required"),
  empDesignation: yup.string().required("required"),
  empGrade: yup.string().required("required"),

  empStatus: yup.string().oneOf(["active", "inactive"]).required("required"),
});

const EmployeeRegisterForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  // State for image preview
  const [empPhotoPreview, setEmpPhotoPreview] = useState(null);

  const handleEmpPhotoUpload = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("empPhoto", file);

    // Set the image preview
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setEmpPhotoPreview(imageURL);
    } else {
      setEmpPhotoPreview(null);
    }
  };

  // Verify Aadhaar
  const [isVerified, setIsVerified] = useState(false);

  // Function to handle button click
  const handleVerifyClick = () => {
    setIsVerified(true);
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
              {/* Employee Photo Section */}
              <div>
                <input
                  id="empPhoto"
                  name="empPhoto"
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    handleEmpPhotoUpload(event, setFieldValue)
                  }
                  onBlur={handleBlur}
                  style={{
                    display: "none",
                  }}
                />
                <label
                  htmlFor="empPhoto"
                  style={{
                    display: "block",
                    color: values.empPhoto ? "#EDF6FF" : "#999999",
                    backgroundColor: "#282828",
                    borderRadius: "0.5rem",
                    borderWidth: "0.1rem",
                    borderColor: "#D7AE83",
                    outline: "none",
                    padding: "13px",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  {values.empPhoto
                    ? values.empPhoto.name
                    : "Upload Employee Photo"}
                </label>
                {touched.empPhoto && errors.empPhoto ? (
                  <div
                    style={{
                      color: "#D3302F",
                      fontSize: "0.7rem",
                      marginLeft: "1rem",
                      marginTop: "3px",
                    }}
                  >
                    {errors.empPhoto}
                  </div>
                ) : null}

                {/* Image Preview Section */}
                {empPhotoPreview && (
                  <div style={{ marginTop: "20px" }}>
                    <img
                      src={empPhotoPreview}
                      alt="Employee Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Form's Text Fields */}
              <TextField
                fullWidth
                size="small"
                variant="filled"
                type="number"
                label="Employee ID"
                name="empId"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.empId}
                error={!!touched.empId && !!errors.empId}
                helperText={touched.empId && errors.empId}
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
                size="small"
                variant="filled"
                type="text"
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.empName}
                name="empName"
                error={!!touched.empName && !!errors.empName}
                helperText={touched.empName && errors.empName}
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
                size="small"
                variant="filled"
                type="number"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.empPhone}
                name="empPhone"
                error={!!touched.empPhone && !!errors.empPhone}
                helperText={touched.empPhone && errors.empPhone}
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
                size="small"
                variant="filled"
                type="email"
                label="Email ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.empEmail}
                name="empEmail"
                error={!!touched.empEmail && !!errors.empEmail}
                helperText={touched.empEmail && errors.empEmail}
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
                size="small"
                variant="filled"
                type="text"
                label="Permanent Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.empPermanentAddress}
                name="empPermanentAddress"
                error={
                  !!touched.empPermanentAddress && !!errors.empPermanentAddress
                }
                helperText={
                  touched.empPermanentAddress && errors.empPermanentAddress
                }
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
                size="small"
                variant="filled"
                type="text"
                label="Current Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.empCurrentAddress}
                name="empCurrentAddress"
                error={
                  !!touched.empCurrentAddress && !!errors.empCurrentAddress
                }
                helperText={
                  touched.empCurrentAddress && errors.empCurrentAddress
                }
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

              <Box position="relative" display="inline-block" width="100%">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleVerifyClick}
                  sx={{
                    fontSize: "14px",
                    position: "absolute",
                    top: "25px",
                    transform: "translateY(-50%)",
                    alignItems: "center",
                    justifyContent: "center",
                    right: 8,
                    zIndex: 1,
                    boxShadow: "none",
                    backgroundColor: isVerified ? "#212121" : "#111111",
                    color: isVerified ? "#00FF00" : "#D7AE83",
                    "&:hover": !isVerified && {
                      backgroundColor: "#333333",
                      color: "#EDF6FF",
                    },
                  }}
                  // disabled={isVerified}
                >
                  {isVerified ? "Verified" : "Verify"}
                </Button>

                {/* Aadhaar Text Field */}
                <TextField
                  fullWidth
                  size="small"
                  variant="filled"
                  type="number"
                  label="Aadhaar ID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.empAadhaarId}
                  name="empAadhaarId"
                  error={!!touched.empAadhaarId && !!errors.empAadhaarId}
                  helperText={touched.empAadhaarId && errors.empAadhaarId}
                  slotProps={{
                    input: {
                      style: {
                        color: "#EDF6FF",
                        backgroundColor: "#282828",
                        borderRadius: "0.5rem",
                        borderWidth: "0.1rem",
                        borderColor: "#D7AE83",
                        outline: "none",
                        paddingRight: "70px"
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

              <TextField
                fullWidth
                size="small"
                variant="filled"
                type="text"
                label="Pan ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.empPanId}
                name="empPanId"
                error={!!touched.empPanId && !!errors.empPanId}
                helperText={touched.empPanId && errors.empPanId}
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
                size="small"
                variant="filled"
                type="date"
                label="Date of Birth"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.empDob}
                name="empDob"
                error={!!touched.empDob && !!errors.empDob}
                helperText={touched.empDob && errors.empDob}
                slotProps={{
                  input: {
                    max: new Date().toISOString().split("T")[0],
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
                    shrink: true,
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
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.empDoj}
                name="empDoj"
                error={!!touched.empDoj && !!errors.empDoj}
                helperText={touched.empDoj && errors.empDoj}
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
                    shrink: true,
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
                label="Department"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.empDepartment}
                name="empDepartment"
                error={!!touched.empDepartment && !!errors.empDepartment}
                helperText={touched.empDepartment && errors.empDepartment}
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
                size="small"
                variant="filled"
                type="text"
                label="Designation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.empDesignation}
                name="empDesignation"
                error={!!touched.empDesignation && !!errors.empDesignation}
                helperText={touched.empDesignation && errors.empDesignation}
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
                size="small"
                variant="filled"
                type="text"
                label="Grade"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.empGrade}
                name="empGrade"
                error={!!touched.empGrade && !!errors.empGrade}
                helperText={touched.empGrade && errors.empGrade}
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

              {/* Role Dropdown Button */}
              <FormControl
                fullWidth
                size="small"
                variant="filled"
                required
                error={!!touched.roleType && !!errors.roleType}
              >
                <InputLabel style={{ color: "#999999" }} id="role-label">
                  Role
                </InputLabel>
                <Select
                  labelId="role-label"
                  name="roleType"
                  value={values.roleType}
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
                    ".MuiSelect-icon": {
                      color: "#999999",
                    },
                    "&::before": {
                      borderBottom: "none", // Removes underline before interaction
                    },
                    "&::after": {
                      borderBottom: "none", // Removes underline after interaction
                    },
                    "&:hover:not(.Mui-disabled)::before": {
                      borderBottom: "none", // Prevent underline on hover
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
                >
                  <MenuItem value="" disabled>
                    Select One
                  </MenuItem>
                  {rolesListData.map((role) => (
                    <MenuItem key={role.roleType} value={role.roleType}>
                      {role.roleType}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.roleType && errors.roleType}
                </FormHelperText>
              </FormControl>

              {/* Reporting 1 Dropdown */}
              <FormControl
                fullWidth
                size="small"
                variant="filled"
                required
                error={!!touched.reporting1 && !!errors.reporting1}
              >
                <InputLabel style={{ color: "#999999" }} id="assets-label">
                  Reporting 1
                </InputLabel>
                <Select
                  labelId="assets-label"
                  name="reporting1"
                  value={values.reporting1}
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
                    ".MuiSelect-icon": {
                      color: "#999999",
                    },
                    "&::before": {
                      borderBottom: "none", // Removes underline before interaction
                    },
                    "&::after": {
                      borderBottom: "none", // Removes underline after interaction
                    },
                    "&:hover:not(.Mui-disabled)::before": {
                      borderBottom: "none", // Prevent underline on hover
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
                >
                  <MenuItem value="" disabled>
                    Select One
                  </MenuItem>
                  {employeeData.map((employee) => (
                    <MenuItem key={employee.name} value={employee.name}>
                      {employee.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.reporting1 && errors.reporting1}
                </FormHelperText>
              </FormControl>

              {/* Reporting 2 Dropdown */}
              <FormControl
                fullWidth
                size="small"
                variant="filled"
                required
                error={!!touched.reporting2 && !!errors.reporting2}
              >
                <InputLabel style={{ color: "#999999" }} id="assets-label">
                  Reporting 2
                </InputLabel>
                <Select
                  labelId="assets-label"
                  name="reporting2"
                  value={values.reporting2}
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
                    ".MuiSelect-icon": {
                      color: "#999999",
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
                >
                  <MenuItem value="" disabled>
                    Select One
                  </MenuItem>
                  {employeeData.map((employee) => (
                    <MenuItem key={employee.name} value={employee.name}>
                      {employee.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.reporting2 && errors.reporting2}
                </FormHelperText>
              </FormControl>

              {/* Asset Dropdown */}
              {/* Searchable and Multi Check Dropdown Button */}
              <FormControl
                fullWidth
                size="small"
                variant="filled"
                required
                error={!!touched.assets && !!errors.assets}
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
                  {touched.assets && errors.assets}
                </FormHelperText>
              </FormControl>

              {/* Status Radio Buttons */}
              <FormControl
                fullWidth
                size="small"
                component="fieldset"
                error={!!touched.empStatus && !!errors.empStatus}
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
                    name="empStatus"
                    value={values.empStatus}
                    onChange={handleChange}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "start",
                      alignItems: "center",
                    }}
                  >
                    <FormControlLabel
                      value="active"
                      control={
                        <Radio
                          // Radio Button Style
                          sx={{
                            color: "#D7AE83",
                            "&.Mui-checked": {
                              color: "#D7AE83",
                            },
                          }}
                        />
                      }
                      label="Active"
                    />
                    <FormControlLabel
                      value="inactive"
                      control={
                        <Radio
                          // Radio Button Style
                          sx={{
                            color: "#D7AE83",
                            "&.Mui-checked": {
                              color: "#D7AE83",
                            },
                          }}
                        />
                      }
                      label="Inactive"
                    />
                  </RadioGroup>
                </div>

                <FormHelperText>
                  {touched.empStatus && errors.empStatus}
                </FormHelperText>
              </FormControl>
            </div>

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
                Register Employee
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EmployeeRegisterForm;

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
