import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import FormikContainer from "Component/Form/FormikContainer";
import { LOGIN_FORM_DATA } from "utils/Form/formFields/formFields";
import { LOGIN_INITIAL_VALUES } from "utils/Form/InitialValues/formInitial";
import { LOGIN_VALIDATION_SCHEMA } from "utils/Form/ValidationSchema/formValidation";
import { signIn } from "Services/authService";
import UserLayout from "Component/Wrapper/UserLayout";
import "./Forms.css";
import FormControl from "Component/Form/FormControl";

export default function LoginForm(props: any) {
  const navigate = useNavigate();
  return (
    <UserLayout>
      <Box className={"login"}>
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
          {LOGIN_FORM_DATA.map((el, index) => (
            <FormControl
              key={index}
              control={el.control}
              name={el.name}
              id={el.name}
              label={el.label}
              type={el.type}
            />
          ))}
        </FormikContainer>
      </Box>
    </UserLayout>
  );
}
