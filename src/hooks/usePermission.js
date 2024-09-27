import { useState, useEffect } from 'react';
import { useUser } from '../context/userContext';

// ceated this custom hook to retrieve the permission data based
// on role. can use this custom hook everywhere

const usePermissions = (count) => {
  console.log('custoo hooke', count)
  const { user } = useUser();
  const [permission, setPermission] = useState({});

  useEffect(() => {
    const role = user?.role;
    const data = localStorage.getItem('rolePermissions');
    const permissionData = JSON.parse(data);
    console.log('permission data', permissionData)
    if (permissionData && role && permissionData[role]) {
      setPermission(permissionData[role]);
    }
  }, [user, count]);

  return permission;
};

export default usePermissions;
