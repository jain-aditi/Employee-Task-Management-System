import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Box>
      <Typography variant="h1">error 404!</Typography>
      <Typography variant="h6">Page Not Found..</Typography>
      <Link to="/" className="text-decor-none">
        <Button variant="text">Back to Home</Button>
      </Link>
    </Box>
  );
};

export default PageNotFound;
