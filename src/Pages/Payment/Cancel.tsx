import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cancel() {
  toast("Payment Failed...");
  return (
    <Box className="m-auto text-center">
      <Typography className="text-center m-2 text-danger">
        Payment Failed
      </Typography>
      <br />
      <Button
        variant="outlined"
        color="error"
        className="btn btn-outline-danger m-2"
      >
        <Link to="/my/bookings" className="nav-link">
          Bookings
        </Link>
      </Button>
    </Box>
  );
}
