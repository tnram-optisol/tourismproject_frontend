import React from "react";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";

import "./Forms.css";
import FormikContainer from "Component/Form/FormikContainer";
import { CONTACT_FORM_DATA } from "utils/Form/formFields/formFields";
import { CONTACT_VALIDATION_SCHEMA } from "utils/Form/ValidationSchema/formValidation";
import { CONTACT_INITIAL_VALUES } from "utils/Form/InitialValues/formInitial";
import { contactAdmin } from "Services/api/userAPI";


export default function ContactForm(props: any) {
  return (
    <Box>
      <ToastContainer />
      <FormikContainer
        initialValues={CONTACT_INITIAL_VALUES}
        formData={CONTACT_FORM_DATA}
        validationSchema={CONTACT_VALIDATION_SCHEMA}
        buttonName={"Contact Us"}
        endPoint={"/mail/admin"}
        apiCall={contactAdmin}
      />
    </Box>
  );
}
