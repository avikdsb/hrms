import { roleManagementData } from "../constants/roleManagementData";

export const getUserRolePermissions = (role) => {
  return roleManagementData[role] || {};
};

export const hasPermission = (role, module, permission) => {
  const permissions = getUserRolePermissions(role);
  return permissions[module] && permissions[module][permission] !== false;
};
