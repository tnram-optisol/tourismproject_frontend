import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Button, Grid, IconButton, Menu, Tooltip } from "@mui/material";
import {
  faCodePullRequest,
  faDatabase,
  faFilter,
  faHome,
  faMoneyBill,
  faPlus,
  faSignOut,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { signOut } from "store/reducers/authReducer";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { toast } from "react-toastify";

const drawerWidth = 240;

function AdminLayout(props: { children: any }) {
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
  const { children } = props;
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
            <Grid item xs>
              <Tooltip title="User Actions">
                <IconButton
                  className="header-icon"
                  onClick={handleClick}
                  sx={{ p: 0, color: "wheat" }}
                >
                  <FontAwesomeIcon icon={faUserCircle} />
                </IconButton>
              </Tooltip>
              <Typography variant="body1" noWrap className="d-inline ml-2">
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
                <Button
                  variant="text"
                  onClick={() => {
                    dispatch(signOut());
                    toast("See You Again!!", {
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
                  <FontAwesomeIcon color="blue" icon={faHome} />
                </ListItemIcon>
                <Link to="/admin/banner" className=" nav-link">
                  Banner
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faFilter} />
                </ListItemIcon>
                <Link to="/admin/category" className=" nav-link">
                  Category
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faCodePullRequest} />
                </ListItemIcon>
                <Link to="/admin/requests" className=" nav-link">
                  Requests
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faUserCircle} />
                </ListItemIcon>
                <Link to="/admin/users" className=" nav-link">
                  Users
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faMoneyBill} />
                </ListItemIcon>
                <Link to="/admin/tour/orders" className=" nav-link">
                  Tour Orders
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faMoneyBill} />
                </ListItemIcon>
                <Link to="/admin/hotel/orders" className=" nav-link">
                  Hotel Orders
                </Link>
              </ListItem>
            </>
          ) : (
            ""
          )}
          {role === 3 ? (
            <>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faPlus} />
                </ListItemIcon>
                <Link to="/add/tours" className=" nav-link">
                  Add Tour Package
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faDatabase} />
                </ListItemIcon>
                <Link to="/view/tours" className="nav-link">
                  View Tours
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faMoneyBill} />
                </ListItemIcon>
                <Link to="/tour/orders" className="nav-link">
                  Orders
                </Link>
              </ListItem>
            </>
          ) : (
            ""
          )}
          {role === 2 ? (
            <>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faPlus} />
                </ListItemIcon>
                <Link to="/add/hotels" className="nav-link">
                  Add Hotel
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faDatabase} />
                </ListItemIcon>
                <Link to="/view/hotels" className="nav-link">
                  View Hotel
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon color="blue" icon={faMoneyBill} />
                </ListItemIcon>
                <Link to="/hotel/orders" className="nav-link">
                  Orders
                </Link>
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
        {children}
      </Box>
    </Box>
  );
}

export default AdminLayout;
