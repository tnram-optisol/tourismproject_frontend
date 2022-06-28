import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "../Forms/Forms.css";
import FormikContainer from "Component/Form/FormikContainer";
import { ADDHOTEL_INITIAL_VALUES } from "utils/Form/InitialValues/formInitial";
import { ADDHOTEL_FORM_DATA } from "utils/Form/formFields/formFields";
import { ADDHOTEL_VALIDATION_SCHEMA } from "utils/Form/ValidationSchema/formValidation";
import FormControl from "Component/Form/FormControl";
import { addHotel } from "Services/api/hotelAPI";
import AdminLayout from "Component/Wrapper/AdminLayout";


const HotelForm = (props: any) => {
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : "";
  const initialValues = {
    ...ADDHOTEL_INITIAL_VALUES,
    user: user.role === 2 ? user : 0,
  };
  const navigate = useNavigate();
  return (
    <AdminLayout>
      <Box>
        <FormikContainer
          className={"login"}
          initialValues={initialValues}
          encType={"multipart/form"}
          formData={ADDHOTEL_FORM_DATA}
          validationSchema={ADDHOTEL_VALIDATION_SCHEMA}
          buttonName={"Add Hotel"}
          location={"/hotel/view/all"}
          redirect={navigate}
          apiCall={addHotel}
          endPoint={`/hotel/add/hotel`}
        />
      </Box>
    </AdminLayout>
  );
};

export default HotelForm;
