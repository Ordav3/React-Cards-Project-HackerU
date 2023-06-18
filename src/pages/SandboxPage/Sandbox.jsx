import React from "react";
import { Typography, Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const SandboxPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="start"
      gap={5}
      marginTop={2}
    >
      <Box display="flex" justifyContent="center" gap={2}></Box>
      {
        <Typography variant="h4" component="h1" gutterBottom>
          Sandbox Page
        </Typography>
      }
      <Outlet />
    </Box>
  );
};

export default SandboxPage;
