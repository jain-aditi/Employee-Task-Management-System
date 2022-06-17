import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import Sidenav from "../../Sidenav/Sidenav";
import "./DashboardLayout.css"
import { getCookieStorage } from "../../../utils/Cookies/Cookies";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => ({ ...state.user }));
  const user = getCookieStorage('user');
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  return (
    <>
      {!loading ? (
        <Box className="dashboard-layout">
          <Header handleDrawerOpen={handleDrawerOpen} />
          <Sidenav open={open} />
          <Box >{children}</Box>
        </Box>
      ) : (
        <Box>loading...</Box>
      )}
    </>
  );
};

export default DashboardLayout;
