import { Box, List, ListItem, ListItemIcon } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserLayout from "Component/Wrapper/UserLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodePullRequest,
  faFilter,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

function MyBookings() {
  return (
    <>
      <UserLayout>
        <ToastContainer />
        <Box sx={{ display: "flex" }}>
          <Box className="position-fixed d-lg-block sidebar">
            <Box className="position-sticky">
              <Box className="mx-3 mt-4">
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <FontAwesomeIcon color="blue" icon={faHome} />
                    </ListItemIcon>
                    <Link to="tour/bookings" className=" nav-link">
                      Tour Bookings
                    </Link>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <FontAwesomeIcon color="blue" icon={faFilter} />
                    </ListItemIcon>
                    <Link to="hotel/bookings" className=" nav-link">
                      Hotel Bookings
                    </Link>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <FontAwesomeIcon color="blue" icon={faCodePullRequest} />
                    </ListItemIcon>
                    <Link to="cancel/tour" className=" nav-link">
                      Canceled Tour
                    </Link>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <FontAwesomeIcon color="blue" icon={faCodePullRequest} />
                    </ListItemIcon>
                    <Link to="cancel/hotel" className=" nav-link">
                      Canceled Hotel
                    </Link>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Box>
          <Box className="bookings">
            <Outlet />
          </Box>
        </Box>
      </UserLayout>
    </>
  );
}

export default MyBookings;
