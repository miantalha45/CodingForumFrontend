import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await fetch("api/User/profile", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(data);
      } else {
        // console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("api/User/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setProfile(null);
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ profile, setProfile, fetchProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
