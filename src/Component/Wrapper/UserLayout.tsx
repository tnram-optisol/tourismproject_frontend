import { Box } from "@mui/material";
import { useAppSelector } from "hooks/useAppSelector";
import Footer from "Layout/Footer";
import NavBar from "Layout/Navbar";
import React from "react";
import { ToastContainer } from "react-toastify";

function UserLayout(props: { children: any }) {
  const { children } = props;
  const role = useAppSelector((state) => state.auth.value.role);
  return (
    <>
      <Box className="App">
        <NavBar />
      </Box>
      <ToastContainer />
      <Box className="main">{children}</Box>
      {role === 4 || role === 0 ? <Footer /> : null}
    </>
  );
}

export default UserLayout;
