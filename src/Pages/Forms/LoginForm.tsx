import React, { useEffect } from "react";
import { Box, Button, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

import FormikContainer from "Component/Form/FormikContainer";
import { LOGIN_FORM_DATA } from "utils/Form/formFields/formFields";
import { LOGIN_INITIAL_VALUES } from "utils/Form/InitialValues/formInitial";
import { LOGIN_VALIDATION_SCHEMA } from "utils/Form/ValidationSchema/formValidation";
import { signIn, signUp } from "Services/authService";
import UserLayout from "Component/Wrapper/UserLayout";
import "./Forms.css";
import { toast } from "react-toastify";
import { useAppDispatch } from "hooks/useAppDispatch";
import * as logIn from "store/reducers/authReducer";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

export default function LoginForm(props: any) {
  const dispatch = useAppDispatch();
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
    console.log(response.profileObj);
    const { profileObj } = response;
    const name: string = profileObj.name
      .split(" ")
      .join("")
      .split(".")
      .join("");
    const email: string = profileObj.email;
    const values = {
      email: email,
      password: "password",
      name: name,
      contact: 8765432109,
      roleId: 4,
      place: "any",
      external: true,
    };
    signUp(values)
      .then(async (res: { data: { token: string } }) => {
        localStorage.setItem("token", res.data.token);
        toast.success("Logged in Successfully", {
          theme: "colored",
        });
        let user = await JSON.parse(
          atob(localStorage.getItem("token")!.split(".")[1])
        );
        dispatch(
          logIn.signIn({
            payload: user.role,
          })
        );
        navigate("/my/profile");
      })
      .catch((err: any) => {
        if (err.response.data) {
          toast.error(err.response.data);
        }
      });
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
