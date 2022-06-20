import { Box } from "@mui/material";
import Footer from "Layout/Footer";
import NavBar from "Layout/Navbar";
import React from "react";
import { ToastContainer } from "react-toastify";

function UserLayout(props) {
  const { children } = props;
  return (
    <>
      <Box className="App">
        <NavBar />
      </Box>
      <ToastContainer />
      {children}
      <Footer />
    </>
  );
}

export default UserLayout;
