import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import "./Forms.css";

import FormikContainer from "Component/Form/FormikContainer";
import FormControl from "Component/Form/FormControl";
import { SIGNUP_FORM_DATA } from "utils/Form/formFields/formFields";
import { SIGNUP_INITIAL_VALUES } from "utils/Form/InitialValues/formInitial";
import { SIGNUP_VALIDATION_SCHEMA } from "utils/Form/ValidationSchema/formValidation";
import { signUp } from "Services/authService";
import UserLayout from "Component/Wrapper/UserLayout";


export default function RegisterForm(props: any) {
  let role:any = useParams();
  let userRole = parseInt(role.id);
  const initialValues = {
    ...SIGNUP_INITIAL_VALUES,
    roleId: userRole,
  };
  const navigate = useNavigate();
  return (
    <UserLayout>
      <Box className="signup">
        <FormikContainer
          className={"signup"}
          initialValues={initialValues}
          formData={SIGNUP_FORM_DATA}
          validationSchema={SIGNUP_VALIDATION_SCHEMA}
          buttonName={"Register"}
          endPoint={"/signUp"}
          apiCall={signUp}
          redirect={navigate}
          location={"/login"}
        >
          {SIGNUP_FORM_DATA.map((el, index) => (
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
