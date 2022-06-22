import { Box, Typography, Button } from "@mui/material";
import UserLayout from "Component/Wrapper/UserLayout";
import ToursLayout from "Layout/ToursLayout";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cancel() {
  toast("Payment Failed...");
  return (
    <UserLayout>
      <ToursLayout />
      <Box className="m-auto text-center">
        <Typography variant="h6" className="text-center m-2 text-danger">
          Payment Failed
        </Typography>
        <br />
        <Button
          variant="outlined"
          color="error"
          className="btn btn-outline-danger m-2"
        >
          <Link to="/my/bookings/tour/bookings" className="nav-link">
            Bookings
          </Link>
        </Button>
      </Box>
    </UserLayout>
  );
}
