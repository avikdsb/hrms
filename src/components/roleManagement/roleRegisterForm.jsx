import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  Collapse,
  FormGroup,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik, Form } from "formik";
import * as yup from "yup";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { modulesData, roleManagementData } from "../../constants/roleManagementData";

const initialValues = {
  roleType: "",
  permissions: {},
};

const userSchema = yup.object().shape({
  roleType: yup.string().required("Role is required"),
  permissions: yup.object().shape({
    // Add validation for permissions if needed
  }),
});

const RoleRegisterForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [permissions, setPermissions] = useState(initialValues.permissions);
  const [openModule, setOpenModule] = useState(null);

  useEffect(() => {
    // Initialize permissions with empty structure if needed
    const initialPermissions = {};
    Object.keys(modulesData).forEach((module) => {
      initialPermissions[module] =
        typeof modulesData[module] === "object"
          ? Object.keys(modulesData[module]).reduce((acc, subModule) => {
              acc[subModule] = false; // default to unchecked
              return acc;
            }, {})
          : false;
    });
    setPermissions(initialPermissions);
  }, []);

  const handleCheckboxChange = (module, subModule) => {
    console.log('module', module, subModule)
    // setPermissions((prevPermissions) => ({
    //   ...prevPermissions,
    //   [module]: {
    //     ...prevPermissions[module],
    //     [subModule]: !prevPermissions[module][subModule],
    //   },
    // }));

    // mdified this function as it is not working properly, now working fine
    setPermissions((prevPermission)=>{
      const currentModule = prevPermission[module] || {}

      if(subModule == undefined){
        return {
          ...prevPermission,
          [module] : !prevPermission[module],
        }
      } else {
        return {
          ...prevPermission,
          [module] : {
            ...currentModule,
            [subModule] : !currentModule[subModule]
          }
        }
      }
    })
  };

  const handleMainModuleChange = (module) => {
    setPermissions((prevPermissions) => {
      const subModules = prevPermissions[module];
      if (!subModules) return prevPermissions;

      const allChecked = Object.values(subModules).every((val) => val);

      return {
        ...prevPermissions,
        [module]: Object.keys(subModules).reduce(
          (acc, key) => ({ ...acc, [key]: !allChecked }),
          {}
        ),
      };
    });
  };

  const isIndeterminate = (module) => {
    const subModules = permissions[module];
    if (!subModules) return false;

    const values = Object.values(subModules);
    return values.some((val) => val) && !values.every((val) => val);
  };

  const toggleModuleOpen = (module) => {
    setOpenModule((prevModule) => (prevModule === module ? null : module));
  };

  const renderSubmodules = (module) => {
    const submodules = permissions[module] || {};
    return Object.keys(submodules).map((subModule) => (
      <FormControlLabel
        key={subModule}
        control={
          <Checkbox
            checked={submodules[subModule]}
            onChange={() => handleCheckboxChange(module, subModule)}
            sx={{
              color: "#EDF6FF",
              "&.Mui-checked": {
                color: "#dfbe9c",
              },
            }}
          />
        }
        label={subModule}
      />
    ));
  };

  // role submission complete . saving data on localstorage
  const handleFormSubmit = (values) => {
    values.permissions = permissions
    let finalObj = {
      [values.roleType] : {
        ...values.permissions
      }
    }
    let exisistingPermissions = JSON.parse(localStorage.getItem('rolePermissions'))
    if(exisistingPermissions){
      Object.assign(exisistingPermissions, finalObj)
      Object.assign(roleManagementData, finalObj)
      let updatedData = JSON.stringify(exisistingPermissions)
      localStorage.setItem('rolePermissions', updatedData)
    }
  };

  let obj = {a:{a1:true, b1:true},b:{b1:true, b2: false}, c:{c1:false, c2:false}}
  let newObj = {d:{d1: false, d2: false}}

  let values = {roleType : 'Test Role', permission : {Dasbhaord: true}}
  //  output finalObj = {Test Role: {Dashboard: true}}

  return (
    <div className="flex flex-col text-[#EDF6FF] font-subtitle bg-[#333333] rounded-xl p-[1.5rem] w-[100%] mt-[0.6rem]">
      <div
        className={`font-title text-[1.5rem] text-[#EDF6FF] text-left mb-[2rem]`}
      >
        Add Role
      </div>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{ ...initialValues, permissions }}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className={`flex flex-col sm:flex-row gap-5`}>
              <div className="min-w-[250px]">
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Role"
                  name="roleType"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.roleType}
                  error={!!touched.roleType && !!errors.roleType}
                  helperText={touched.roleType && errors.roleType}
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
              </div>

              <div className="">
                {Object.keys(modulesData).map((module) => {
                  const isSubmodule = typeof modulesData[module] === "object";

                  return (
                    <div className="flex flex-col" key={module}>
                      <div className="flex items-center">
                        <Checkbox
                          checked={
                            isSubmodule
                              ? Object.values(permissions[module] || {}).every(
                                  (val) => val
                                )
                              : permissions[module] || false
                          }
                          indeterminate={isSubmodule && isIndeterminate(module)}
                          onChange={() =>
                            isSubmodule
                              ? handleMainModuleChange(module)
                              : handleCheckboxChange(module)
                          }
                          sx={{
                            color: "#EDF6FF",
                            "&.Mui-checked": {
                              color: "#dfbe9c",
                            },
                            "&.MuiCheckbox-indeterminate": {
                              color: "#dfbe9c",
                            },
                          }}
                        />
                        <span style={{ color: "#EDF6FF" }}>{module}</span>

                        {isSubmodule && (
                          <IconButton
                            onClick={() => toggleModuleOpen(module)}
                            sx={{
                              color: "#EDF6FF",
                              transform:
                                openModule === module
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                            }}
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        )}
                      </div>

                      {isSubmodule && (
                        <Collapse
                          in={openModule === module}
                          style={{ width: "100%" }}
                        >
                          <FormGroup sx={{ ml: 4 }}>
                            {renderSubmodules(module)}
                          </FormGroup>
                        </Collapse>
                      )}
                    </div>
                  );
                })}

                <div className="flex justify-end gap-5 mt-[2rem]">
                  <Button
                    type="submit"
                    sx={{
                      color: "#EDF6FF",
                      backgroundColor: "#D7AE83",
                      "&:hover": { backgroundColor: "#b2987d" },
                    }}
                  >
                    Register Role
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RoleRegisterForm;
