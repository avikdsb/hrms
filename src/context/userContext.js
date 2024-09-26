import React, { createContext, useContext, useState, useEffect } from "react";

// Create a new UserContext
const UserContext = createContext();

// Custom hook to access the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// Provider component to wrap around parts of the app that need access to the user state
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Signin function to store user in state and localStorage
  const handleSignin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Signout function to remove user from state and localStorage
  const handleSignout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Check if the user is already signed in (persisted in localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, handleSignin, handleSignout }}>
      {children}
    </UserContext.Provider>
  );
};
