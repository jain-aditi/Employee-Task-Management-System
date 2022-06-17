import { createTheme, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import React from "react";

const theme = createTheme();

const LeftBox = styled("div")(() => ({
  maxHeight: "100vh",
  width: "20%",
  padding: theme.spacing(4, 2),
  backgroundColor: "black",
  color: "white",
  display: "flex",
  flexDirection: "column",
  position:'relative'
}));

const LoginLeft = () => {
  return (
    <LeftBox>
      <Typography variant="h6">
        The smarter way to Sort, Analyse and Manage Organizational Tasks and Data
      </Typography>
      <div className="login-left-image" />
      <Typography variant="caption" className="login-left-bottom-text" >
        Reduce False Positives by <span>-94%</span>
        <br />
        Reduce Project Execution Time by <span>-75%</span>
      </Typography>
    </LeftBox>
  );
};

export default LoginLeft;
