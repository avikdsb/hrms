import React, { useState, useEffect } from "react";
import {
  IconButton,
  Checkbox,
  Button,
  Collapse,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { roleManagementData } from "../../constants/roleManagementData";
import { useDispatch } from "react-redux";
import { contentPermissionAction } from "../../Store/ContentConfigurations/contentconfig.actions";

const LOCAL_STORAGE_KEY = "rolePermissions";

const RoleManagement = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch()

  const loadPermissionsFromStorage = () => {
    const savedPermissions = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedPermissions ? JSON.parse(savedPermissions) : roleManagementData;
  };

  const [rolePermissions, setRolePermissions] = useState(
    loadPermissionsFromStorage()
  );
  const [tempRolePermissions, setTempRolePermissions] =
    useState(rolePermissions);
  const [selectedRole, setSelectedRole] = useState("Admin");
  const [openModule, setOpenModule] = useState(null);

  useEffect(() => {
    setTempRolePermissions(rolePermissions);
    setOpenModule(null);
  }, [rolePermissions]);

  const handleCheckboxChange = (role, permission) => {
    setTempRolePermissions((prevPermissions) => ({
      ...prevPermissions,
      [role]: {
        ...prevPermissions[role],
        [permission]: !prevPermissions[role][permission],
      },
    }));
  };

  const handleNestedCheckboxChange = (role, parentPermission, permission) => {
    setTempRolePermissions((prevPermissions) => ({
      ...prevPermissions,
      [role]: {
        ...prevPermissions[role],
        [parentPermission]: {
          ...prevPermissions[role][parentPermission],
          [permission]: !prevPermissions[role][parentPermission][permission],
        },
      },
    }));
  };

  const isIndeterminate = (role, parentPermission) => {
    const submodules = tempRolePermissions[role]?.[parentPermission];
    if (!submodules) return false;
    const values = Object.values(submodules);
    return values.some((val) => val) && !values.every((val) => val);
  };

  const handleMainModuleChange = (role, parentPermission) => {
    const submodules = tempRolePermissions[role]?.[parentPermission];
    if (!submodules) return;
    const allChecked = Object.values(submodules).every((val) => val);

    setTempRolePermissions((prevPermissions) => ({
      ...prevPermissions,
      [role]: {
        ...prevPermissions[role],
        [parentPermission]: Object.keys(submodules).reduce(
          (acc, key) => ({ ...acc, [key]: !allChecked }),
          {}
        ),
      },
    }));
  };

  const handlePublish = () => {
    setRolePermissions(tempRolePermissions);
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(tempRolePermissions)
    );
    // dispatch action to redux to manage global state
    dispatch(contentPermissionAction(tempRolePermissions))
  };

  const handleCancel = () => {
    setTempRolePermissions(rolePermissions);
  };

  const toggleModuleOpen = (module) => {
    setOpenModule((prevModule) => (prevModule === module ? null : module));
  };

  const renderSubmodules = (role, parentPermission) => {
    const submodules = tempRolePermissions[role]?.[parentPermission] || {};
    return Object.keys(submodules).map((subPermission) => (
      <div key={subPermission} style={{ marginLeft: "20px" }}>
        <Checkbox
          checked={submodules[subPermission]}
          onChange={() =>
            handleNestedCheckboxChange(role, parentPermission, subPermission)
          }
          sx={{
            color: "#EDF6FF",
            "&.Mui-checked": {
              color: "#dfbe9c",
            },
          }}
        />
        <span style={{ color: "#EDF6FF" }}>{subPermission}</span>
      </div>
    ));
  };

  return (
    <div className="flex flex-col bg-[#333333] rounded-xl p-[1.5rem] w-[100%] mt-[0.6rem]">
      <div
        className={`font-title text-[1.5rem] text-[#EDF6FF] text-left mb-[2rem]`}
      >
        Manage Roles
      </div>

      <div className="flex justify-between items-start text-[#EDF6FF] max-w-[100%] md:max-w-[50%]">
        <div className="flex flex-col w-[40%] max-w-[200px] border-r border-[#EDF6FF] pr-[1rem]">
          {Object.keys(roleManagementData).map((role) => (
            <Button
              key={role}
              onClick={() => setSelectedRole(role)}
              sx={{
                margin: "0.5rem 0",
                color: selectedRole === role ? "#111111" : "#aaaaaa",
                backgroundColor:
                  selectedRole === role ? "#D7AE83" : "transparent",
                "&:hover": {
                  backgroundColor:
                    selectedRole === role ? "#D7AE83" : "#81684f",
                },
                justifyContent: "start",
              }}
            >
              {role}
            </Button>
          ))}
        </div>

        <div className="flex flex-col w-[65%]">
          {Object.keys(tempRolePermissions[selectedRole] || {}).map(
            (permission) => {
              const isSubmodule =
                typeof tempRolePermissions[selectedRole][permission] ===
                "object";

              return (
                <div className="flex flex-col" key={permission}>
                  <div className="flex items-center">
                    <Checkbox
                      checked={
                        isSubmodule
                          ? Object.values(
                              tempRolePermissions[selectedRole][permission] ||
                                {}
                            ).every((val) => val)
                          : tempRolePermissions[selectedRole][permission] ||
                            false
                      }
                      indeterminate={
                        isSubmodule && isIndeterminate(selectedRole, permission)
                      }
                      onChange={() =>
                        isSubmodule
                          ? handleMainModuleChange(selectedRole, permission)
                          : handleCheckboxChange(selectedRole, permission)
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
                    <span style={{ color: "#EDF6FF" }}>{permission}</span>

                    {isSubmodule && (
                      <IconButton
                        onClick={() => toggleModuleOpen(permission)}
                        sx={{
                          color: "#EDF6FF",
                          transform:
                            openModule === permission
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
                      in={openModule === permission}
                      style={{ width: "100%" }}
                    >
                      {renderSubmodules(selectedRole, permission)}
                    </Collapse>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="flex justify-end gap-5 mt-[2rem] max-w-[100%] md:max-w-[50%]">
        <Button
          onClick={handleCancel}
          sx={{
            color: "#EDF6FF",
            backgroundColor: "#555555",
            "&:hover": { backgroundColor: "#777777" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handlePublish}
          sx={{
            color: "#EDF6FF",
            backgroundColor: "#D7AE83",
            "&:hover": { backgroundColor: "#b2987d" },
          }}
        >
          Publish
        </Button>
      </div>
    </div>
  );
};

export default RoleManagement;
