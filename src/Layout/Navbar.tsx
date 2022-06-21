import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import { useSearchParams, useNavigate } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSignIn,
  faSignOut,
  faUserCircle,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { signOut } from "../store/reducers/authReducer";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";

const NavBar = () => {
  const loggedIn = useAppSelector((state) => state.auth.value.loggedIn);
  const role = useAppSelector((state) => state.auth.value.role);
  const email = useAppSelector((state) => state.auth.value.email);
  const dispatch = useAppDispatch();
  console.log(role, email);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenUserMenu = (event:any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [query, setQuery] = useState({
    location: ''
  });

  const searchTour = () => {
    setSearchParams(query);
    navigate({
      pathname: "/tour",
      search: `?location=${query.location}`,
    });
  };

  return (
    <Container className="header">
      <AppBar
        className="header"
        position="fixed"
        sx={{ backgroundColor: "white", margin: 0 }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/">
              <img
                className="header__icon"
                src="https://i.pinimg.com/736x/69/69/d9/6969d98d55bf6f2600153585a2b4ef9b--travel-logo-logo-design-inspiration.jpg"
                alt="World Tour"
              />
            </Link>
            <Box
              className="header-center"
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                margin: 5,
              }}
            >
              <FormControl>
                <select
                  aria-label="Default select example"
                  className="search"
                  onChange={(event) =>
                    setQuery({ location: event.target.value })
                  }
                >
                  <option value="">Search Available Packages</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="America">America</option>
                  <option value="Australia">Australia</option>
                </select>
              </FormControl>
              <Button type="submit" onClick={() => searchTour()}>
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Box>
            <Box
              sx={{
                flexGrow: 0,
                display: { xs: "none", md: "flex" },
                marginLeft: "auto",
              }}
              className="header-right"
            >
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button onClick={handleClick}>
                  More Links
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  {" "}
                  {role === 0 || role === 4 ? (
                    <Typography variant="h6" component="div" sx={{ margin: 1 }}>
                      <Link to="/hotels" className="nav-link">
                        Hotels
                      </Link>
                    </Typography>
                  ) : (
                    ""
                  )}
                  {role === 1 ? (
                    <Box>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ margin: 1 }}
                      >
                        <Link to="/admin/dashboard" className=" nav-link">
                          DashBoard
                        </Link>
                      </Typography>
                    </Box>
                  ) : (
                    ""
                  )}
                  {role === 2 ? (
                    <Box>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ margin: 1 }}
                      >
                        <Link to="/add/hotels" className="nav-link">
                          Add Hotel
                        </Link>
                      </Typography>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ margin: 1 }}
                      >
                        <Link to="/view/hotels" className="nav-link">
                          View Hotel
                        </Link>
                      </Typography>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ margin: 1 }}
                      >
                        <Link to="/hotel/orders" className="nav-link">
                          Orders
                        </Link>
                      </Typography>
                    </Box>
                  ) : (
                    ""
                  )}
                  {role === 3 ? (
                    <Box>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ margin: 1 }}
                      >
                        <Link to="/add/tours" className="nav-link">
                          Add Tours
                        </Link>
                      </Typography>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ margin: 1 }}
                      >
                        <Link to="/view/tours" className="nav-link">
                          View Tours
                        </Link>
                      </Typography>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ margin: 1 }}
                      >
                        <Link to="/tour/orders" className="nav-link">
                          Orders
                        </Link>
                      </Typography>
                    </Box>
                  ) : (
                    ""
                  )}
                  {role === 4 ? (
                    <Box>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ margin: 1 }}
                      >
                        <Link to="/my/bookings" className="nav-link">
                          My Bookings
                        </Link>
                      </Typography>
                    </Box>
                  ) : (
                    ""
                  )}
                </Menu>
              </Box>
              <Typography variant="h6" color="black" className="m-2">
                <LanguageIcon />
              </Typography>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="User Actions">
                  <IconButton
                    className="header-icon"
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                  >
                    <ReadMoreIcon className="m-2" />
                    <FontAwesomeIcon icon={faUserCircle} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {loggedIn ? (
                    <Button
                      className="d-block"
                      onClick={() => {
                        dispatch(signOut());
                      }}
                    >
                      <Link to="/signin" className="nav-link">
                        <FontAwesomeIcon icon={faSignOut} /> Sign Out
                      </Link>
                    </Button>
                  ) : (
                    <Box>
                      <Button className="d-block">
                        <Link to="/signin" className="nav-link">
                          <FontAwesomeIcon icon={faSignIn} /> Sign In
                        </Link>
                      </Button>
                      <Button>
                        <Link className="nav-link" to="/signup">
                          <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                        </Link>
                      </Button>
                    </Box>
                  )}
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Container>
  );
};
export default NavBar;
