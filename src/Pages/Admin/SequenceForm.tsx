import { Box } from "@mui/material";
import React from "react";
import { ToastContainer } from "react-toastify";

import FormikContainer from "Component/Form/FormikContainer";
import InputControl from "Component/Form/InputControl";
import { adminSequence } from "Services/api/adminAPI";
import { SEQUENCE_FORM_DATA } from "utils/Form/formFields/formFields";
import { SEQUENCE_INITIAL_VALUES } from "utils/Form/InitialValues/formInitial";
import { SEQUENCE_VALIDATION_SCHEMA } from "utils/Form/ValidationSchema/formValidation";


function SequenceForm(props:any) {
  const tour_id = props;
  const initialValues = {
    ...SEQUENCE_INITIAL_VALUES,
    tourId: tour_id.tourId,
  };
  return (
    <Box className="m-auto">
      <ToastContainer />
      <FormikContainer
        className={"sequence"}
        initialValues={initialValues}
        formData={SEQUENCE_FORM_DATA}
        validationSchema={SEQUENCE_VALIDATION_SCHEMA}
        buttonName={"Set Sequence"}
        apiCall={adminSequence}
        endPoint={"/admin/sequence"}
      />
    </Box>
  );
}

export default SequenceForm;
