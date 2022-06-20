import { Box, Typography,Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Success() {
  toast('Payment Succeeded')
  return (
    <Box>
      <ToastContainer></ToastContainer>
      <Typography className="text-center m-2 text-success">
        Payment Succeeded
        <br/>
        <Button variant="outlined" color="success" >
        <Link to="/my/bookings" className="nav-link">
          Bookings
        </Link>
      </Button>
      </Typography>
      
    </Box>
  );
}
