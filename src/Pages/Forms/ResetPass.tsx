import { Box, Typography } from "@mui/material";
import FormikContainer from "Component/Form/FormikContainer";
import UserLayout from "Component/Wrapper/UserLayout";
import React from "react";
import { useNavigate } from "react-router-dom";
import { resetPass } from "Services/authService";
import { RESETPASS_FORM_DATA } from "utils/Form/formFields/formFields";
import { RESETPASS_INITIAL_VALUES } from "utils/Form/InitialValues/formInitial";
import { RESETPASS_VALIDATION_SCHEMA } from "utils/Form/ValidationSchema/formValidation";

function ResetPass() {
  const navigate = useNavigate();
  return (
    <UserLayout>
      <Box className={"login"}>
        <Typography variant="h6" color="blue" className="text-center">
          Reset Password !!
        </Typography>
        <FormikContainer
          className={"login"}
          initialValues={RESETPASS_INITIAL_VALUES}
          formData={RESETPASS_FORM_DATA}
          validationSchema={RESETPASS_VALIDATION_SCHEMA}
          buttonName={"Submit"}
          redirect={navigate}
          location={"/siginin"}
          apiCall={resetPass}
        />
      </Box>
    </UserLayout>
  );
}

export default ResetPass;
