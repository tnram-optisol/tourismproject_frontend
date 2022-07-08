import React, { useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  Menu,
  Tooltip,
  Box,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  Badge,
} from "@mui/material";
import {
  faCodePullRequest,
  faFilter,
  faHome,
  faMoneyBill,
  faSignOut,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Link, Outlet } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";
import { toast } from "react-toastify";

import { signOut } from "store/reducers/authReducer";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";

const drawerWidth = 240;

function AdminLayout(props: { children?: any; messages?: number }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = useAppSelector((state) => state.auth.value.email);
  const role = useAppSelector((state) => state.auth.value.role);
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Grid container spacing={3}>
            <Grid item xs>
              {role === 1 ? (
                <Typography variant="h6" noWrap component="div" color="white">
                  <Link to="/admin/dashboard" className="admin-nav">
                    Dash Board
                  </Link>
                </Typography>
              ) : (
                <Typography variant="h6" noWrap component="div">
                  Dash Board
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={4}>
              {role === 1 ? (
                <Link to="/admin/notification">
                  <Badge
                    badgeContent={props.messages}
                    color="secondary"
                    className="d-iniline mr-2"
                  >
                    <MailIcon color="action" />
                  </Badge>
                </Link>
              ) : null}
              <Tooltip title="User Actions">
                <IconButton
                  className="header-icon m-2"
                  onClick={handleClick}
                  sx={{ p: 0, color: "wheat" }}
                >
                  <FontAwesomeIcon icon={faUserCircle} />
                </IconButton>
              </Tooltip>
              <Typography variant="body1" noWrap className="d-inline mr-2">
                Welcome {user}
              </Typography>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link to="/my/profile" className="nav-link button">
                  <FontAwesomeIcon icon={faUser} /> Profile
                </Link>
                <Button
                  variant="text"
                  onClick={() => {
                    dispatch(signOut());
                    toast.success("See You Again!!", {
                      theme: "colored",
                    });
                  }}
                >
                  <Link to="/signin" className="nav-link">
                    <FontAwesomeIcon icon={faSignOut} /> Sign Out
                  </Link>
                </Button>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
        className="drawer"
      >
        {" "}
        <Link to="/">
          <img
            className="header__icon"
            src="https://i.pinimg.com/736x/69/69/d9/6969d98d55bf6f2600153585a2b4ef9b--travel-logo-logo-design-inspiration.jpg"
            alt="World Tour"
            height="25px"
          />
        </Link>
        <Divider />
        <List>
          {role === 1 ? (
            <>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faUserCircle} />
                </ListItemIcon>
                <NavLink
                  to="users"
                  className={({ isActive }) =>
                    isActive ? "active" : "nav-link"
                  }
                >
                  Users
                </NavLink>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faHome} />
                </ListItemIcon>
                <NavLink
                  to="/admin/banner"
                  className={({ isActive }) =>
                    isActive ? "active" : "nav-link"
                  }
                >
                  Banner
                </NavLink>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faHome} />
                </ListItemIcon>
                <NavLink
                  to="/admin/coupon"
                  className={({ isActive }) =>
                    isActive ? "active" : "nav-link"
                  }
                >
                  Coupon
                </NavLink>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faFilter} />
                </ListItemIcon>
                <NavLink
                  to="/admin/category"
                  className={({ isActive }) =>
                    isActive ? "active" : "nav-link"
                  }
                >
                  Category
                </NavLink>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faCodePullRequest} />
                </ListItemIcon>
                <NavLink
                  to="/admin/requests/tour"
                  className={({ isActive }) =>
                    isActive ? "active" : "nav-link"
                  }
                >
                  Tour Requests
                </NavLink>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faCodePullRequest} />
                </ListItemIcon>
                <NavLink
                  to="/admin/requests/hotel"
                  className={({ isActive }) =>
                    isActive ? "active" : "nav-link"
                  }
                >
                  Hotel Requests
                </NavLink>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faMoneyBill} />
                </ListItemIcon>
                <NavLink
                  to="/admin/tour/orders"
                  className={({ isActive }) =>
                    isActive ? "active" : "nav-link"
                  }
                >
                  Tour Orders
                </NavLink>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faMoneyBill} />
                </ListItemIcon>
                <NavLink
                  to="/admin/hotel/orders"
                  className={({ isActive }) =>
                    isActive ? "active" : "nav-link"
                  }
                >
                  Hotel Orders
                </NavLink>
              </ListItem>
            </>
          ) : (
            ""
          )}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;
