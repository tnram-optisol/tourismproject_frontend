import React from "react";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

import FormikContainer from "Component/Form/FormikContainer";
import InputControl from "Component/Form/InputControl";
import { adminPostCategory } from "Services/api/adminAPI";
import { CATEGORY_FORM_DATA } from "utils/Form/formFields/formFields";
import { ADDCATEGORY_INITIAL_VALUES } from "utils/Form/InitialValues/formInitial";
import { ADDCATEGORY_VALIDATION_SCHEMA } from "utils/Form/ValidationSchema/formValidation";

function AddCategory() {
  const navigate = useNavigate();
  return (
    <Box className="m-auto">
      <FormikContainer
        className={"login"}
        initialValues={ADDCATEGORY_INITIAL_VALUES}
        formData={CATEGORY_FORM_DATA}
        validationSchema={ADDCATEGORY_VALIDATION_SCHEMA}
        buttonName={"Add Category"}
        apiCall={adminPostCategory}
        endPoint={"/admin/category"}
        redirect={navigate}
      />
    </Box>
  );
}

export default AddCategory;
