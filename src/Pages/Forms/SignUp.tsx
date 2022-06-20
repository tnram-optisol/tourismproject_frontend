import React from "react";
import { Button, Box } from "@mui/material";
import User from "@mui/icons-material/PersonAddAlt";
import { Link } from "react-router-dom";

import UserLayout from "Component/Wrapper/UserLayout";
import "./Forms.css";

export default function SignUpForm(props: any) {
  return (
    <UserLayout>
      <Box className="signup">
        <Button
          type="submit"
          variant="outlined"
          className="d-block button"
          startIcon={<User />}
        >
          <Link className="nav-link" to="/signup/2">
            Sign Up as Hotel Owner
          </Link>
        </Button>
        <Button
          type="submit"
          variant="outlined"
          className="d-block button "
          startIcon={<User />}
        >
          <Link className="nav-link" to="/signup/3">
            Sign Up Tour Provider
          </Link>
        </Button>
        <Button
          type="submit"
          variant="outlined"
          className="d-block  button"
          startIcon={<User />}
        >
          <Link className="nav-link" to="/signup/4">
            Sign Up User
          </Link>
        </Button>
      </Box>
    </UserLayout>
  );
}
