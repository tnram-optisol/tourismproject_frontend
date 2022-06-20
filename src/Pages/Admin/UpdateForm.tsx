import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import {
  adminGetTour,
  adminPostTourUpdate,
  getCategory,
} from "Services/api/adminAPI";
import AdminLayout from "Component/Wrapper/AdminLayout";
import FormikContainer from "Component/Form/FormikContainer";
import { SETCATEGORY_INITIAL_VALUES } from "utils/Form/InitialValues/formInitial";
import { SETCATEGORY_FORM_DATA } from "utils/Form/formFields/formFields";
import { SETCATEGORY_VALIDATION_SCHEMA } from "utils/Form/ValidationSchema/formValidation";
import InputControl from "Component/Form/InputControl";
import "../Forms/Forms.css";

const UpdateForm = () => {
  const query:any = useParams();
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
            tour:res.data.tour_id
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
  }, []);

  return (
    <AdminLayout>
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
        >
          {SETCATEGORY_FORM_DATA.map((el, index) => (
            <InputControl
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
    </AdminLayout>
  );
};

export default UpdateForm;
