import React from "react";
import { useEffect } from "react";
import { logout } from "../../Services/UserServices";

const Logout = () => {
  useEffect(() => {
    logout();
    window.location = "/";
  }, []);

  return null;
};

export default Logout;
