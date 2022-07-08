import React, { useEffect } from "react";
import { Box, Button, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

import FormikContainer from "Component/Form/FormikContainer";
import { LOGIN_FORM_DATA } from "utils/Form/formFields/formFields";
import { LOGIN_INITIAL_VALUES } from "utils/Form/InitialValues/formInitial";
import { LOGIN_VALIDATION_SCHEMA } from "utils/Form/ValidationSchema/formValidation";
import { signIn } from "Services/authService";
import UserLayout from "Component/Wrapper/UserLayout";
import "./Forms.css";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

export default function LoginForm(props: any) {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });
  const navigate = useNavigate();
  const responseGoogle = (response: any) => {
    console.log(response);
  };
  return (
    <UserLayout>
      <Box className={"login"}>
        <Grid container spacing={2} className="login-form">
          <Grid item xs={8}>
            <FormikContainer
              className={"login"}
              initialValues={LOGIN_INITIAL_VALUES}
              formData={LOGIN_FORM_DATA}
              validationSchema={LOGIN_VALIDATION_SCHEMA}
              buttonName={"Login"}
              apiCall={signIn}
              endPoint={"/signIn"}
              redirect={navigate}
            >
              <Box className="mt-2">
                <Button
                  variant="text"
                  color="error"
                  className="m-2 d-inline"
                  onClick={() => {
                    navigate("/get-otp");
                  }}
                >
                  Reset Password
                </Button>
              </Box>
            </FormikContainer>
          </Grid>
          <Grid item xs={4} className="social-login">
            <Container maxWidth="md">
              <GoogleLogin
                className="mt-5"
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </Container>
          </Grid>
        </Grid>
      </Box>
    </UserLayout>
  );
}
