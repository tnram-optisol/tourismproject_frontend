import React from "react";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

import FormikContainer from "Component/Form/FormikContainer";
import { adminAddCoupon } from "Services/api/adminAPI";
import { COUPON_VALIDATION_SCHEMA } from "utils/Form/ValidationSchema/formValidation";
import { COUPON_FORM_DATA } from "utils/Form/formFields/formFields";
import { COUPON_INITIAL_VALUES } from "utils/Form/InitialValues/formInitial";

function AddCoupon() {
  const navigate = useNavigate();
  return (
    <Box className="m-auto">
      <FormikContainer
        className={"login"}
        initialValues={COUPON_INITIAL_VALUES}
        formData={COUPON_FORM_DATA}
        validationSchema={COUPON_VALIDATION_SCHEMA}
        buttonName={"Add Category"}
        apiCall={adminAddCoupon}
        endPoint={"/admin/category"}
        redirect={navigate}
      />
    </Box>
  );
}

export default AddCoupon;
