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
  name: "",
  phone: "",
  email: "",
  address: "",
  department: "",
  dob: "",
  doj: new Date().toISOString().split("T")[0],
  status: "active",
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
  name: yup.string().required("required"),

  dob: yup
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
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  email: yup.string().email("invalid email").required("required"),
  address: yup.string().required("required"),
  department: yup.string().required("required"),

  doj: yup
    .string()
    .required("required")
    .test("is-current-date", "Date must be today's date only", (value) => {
      const selectedDate = new Date(value).toISOString().split("T")[0];
      const todayDate = new Date().toISOString().split("T")[0];
      return selectedDate === todayDate;
    }),

  status: yup.string().oneOf(["active", "inactive"]).required("required"),
});

const EmployeeRegisterForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  // State for image preview
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("empPhoto", file);

    // Set the image preview
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
    } else {
      setImagePreview(null);
    }
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
                  onChange={(event) => handleFileChange(event, setFieldValue)}
                  onBlur={handleBlur}
                  style={{
                    width: "100%",
                    color: "#EDF6FF",
                    backgroundColor: "#282828",
                    borderRadius: "0.5rem",
                    borderWidth: "0.1rem",
                    borderColor: "#D7AE83",
                    outline: "none",
                    padding: "13px",
                  }}
                />
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
                {imagePreview && (
                  <div style={{ marginTop: "20px" }}>
                    <img
                      src={imagePreview}
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
                variant="filled"
                type="text"
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
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
                type="date"
                label="D.O.B."
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dob}
                name="dob"
                error={!!touched.dob && !!errors.dob}
                helperText={touched.dob && errors.dob}
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
                variant="filled"
                type="number"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
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
                type="email"
                label="Email ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
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
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
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
                label="Department"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.department}
                name="department"
                error={!!touched.department && !!errors.department}
                helperText={touched.department && errors.department}
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

              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="D.O.J."
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.doj}
                name="doj"
                error={!!touched.doj && !!errors.doj}
                helperText={touched.doj && errors.doj}
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

              {/* Reporting 1 Dropdown */}

              <FormControl
                fullWidth
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
                variant="filled"
                required
                error={!!touched.assets && !!errors.assets}
              >
                <Autocomplete
                  id="assets-autocomplete"
                  multiple
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
                component="fieldset"
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
                    value={values.status}
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
                  {touched.status && errors.status}
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
