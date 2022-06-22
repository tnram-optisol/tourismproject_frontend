import { Box, Typography, Button } from "@mui/material";
import UserLayout from "Component/Wrapper/UserLayout";
import ToursLayout from "Layout/ToursLayout";
import React from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Success() {
  toast("Payment Succeeded");
  return (
    <UserLayout>
      <ToursLayout />
      <Box>
        <ToastContainer></ToastContainer>
        <Typography variant="h6" className="text-center m-2 text-success">
          Payment Succeeded
          <br />
          <Button variant="outlined" color="success">
            <Link to="/my/bookings/tour/bookings" className="nav-link">
              Bookings
            </Link>
          </Button>
        </Typography>
      </Box>
    </UserLayout>
  );
}
