import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import {
  adminGetTour,
  adminPostTourUpdate,
  getCategory,
} from "Services/api/adminAPI";
import FormikContainer from "Component/Form/FormikContainer";
import { SETCATEGORY_INITIAL_VALUES } from "utils/Form/InitialValues/formInitial";
import { SETCATEGORY_FORM_DATA } from "utils/Form/formFields/formFields";
import { SETCATEGORY_VALIDATION_SCHEMA } from "utils/Form/ValidationSchema/formValidation";
import "../Forms/Forms.css";

const UpdateForm = () => {
  const query: any = useParams();
  const tourId = +query.id;
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [initialValues, setInitialValues] = useState({
    ...SETCATEGORY_INITIAL_VALUES,
    tour: tourId,
  });
  useEffect(() => {
    if (tourId > 0) {
      adminGetTour(tourId)
        .then((res) => {
          setInitialValues({
            ...SETCATEGORY_INITIAL_VALUES,
            name: res.data.package_name,
            from: res.data.from,
            to: res.data.to,
            tour: res.data.tour_id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      getCategory()
        .then((res) => {
          setCategory(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [tourId]);

  return (
    <Box>
      <ToastContainer />
      <FormikContainer
        className={"login"}
        initialValues={initialValues}
        formData={SETCATEGORY_FORM_DATA}
        validationSchema={SETCATEGORY_VALIDATION_SCHEMA}
        buttonName={"Set Category"}
        endPoint={"/admin/category"}
        redirect={navigate}
        options={category}
        apiCall={adminPostTourUpdate}
      />
    </Box>
  );
};

export default UpdateForm;
