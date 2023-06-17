import React, { useState } from "react";
import { Popover, IconButton, Typography, Box } from "@mui/material";

const PopoverComp = ({ icon, content }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>{icon}</IconButton>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorReference="none"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          onClick={handleClose}
        >
          <Box
            sx={{
              padding: 2,
              backgroundColor: "white",
              borderRadius: 1,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" style={{ marginBottom: "8px" }}>
              The Seller's phone number is:
            </Typography>
            <Typography style={{ color: "green" }}>{content}</Typography>
          </Box>
        </Box>
      </Popover>
    </React.Fragment>
  );
};

export default PopoverComp;
