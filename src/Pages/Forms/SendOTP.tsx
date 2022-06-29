import { Box, Typography } from "@mui/material";
import FormikContainer from "Component/Form/FormikContainer";
import UserLayout from "Component/Wrapper/UserLayout";
import React from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "Services/authService";
import { GETOTP_FORM_DATA } from "utils/Form/formFields/formFields";
import { GETOTP_INITIAL_VALUES } from "utils/Form/InitialValues/formInitial";
import { GETOTP_VALIDATION_SCHEMA } from "utils/Form/ValidationSchema/formValidation";

function SendOTP() {
  const navigate = useNavigate();
  return (
    <UserLayout>
      <Box className="login">
        <Typography variant="h6" color="blue" className="text-center">
          Reset Password !!
        </Typography>
        <FormikContainer
          className={"login"}
          initialValues={GETOTP_INITIAL_VALUES}
          formData={GETOTP_FORM_DATA}
          validationSchema={GETOTP_VALIDATION_SCHEMA}
          buttonName={"Submit"}
          redirect={navigate}
          apiCall={sendOtp}
          location={"/reset-password"}
        />
      </Box>
    </UserLayout>
  );
}

export default SendOTP;
