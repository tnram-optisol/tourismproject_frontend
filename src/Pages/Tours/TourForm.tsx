import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import FormikContainer from "Component/Form/FormikContainer";
import { ADDTOUR_INITIAL_VALUES } from "utils/Form/InitialValues/formInitial";
import { ADDTOUR_FORM_DATA } from "utils/Form/formFields/formFields";
import { ADDTOUR_VALIDATION_SCHEMA } from "utils/Form/ValidationSchema/formValidation";
import { postTour, updateTour, viewAdminTour } from "Services/api/toursAPI";
import AdminLayout from "Component/Wrapper/AdminLayout";
import FormControl from "Component/Form/FormControl";


const TourForm = () => {
  const query: any = useParams();
  const tourId = +query.id;
  const token = localStorage.getItem("token");
  const user = JSON.parse(atob(token!.split(".")[1]));
  const [initialValues, setInitialValues] = useState({
    ...ADDTOUR_INITIAL_VALUES,
    user: user.role === 3 ? user : 0,
    tourId: tourId,
    days: 0,
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (tourId > 0) {
      viewAdminTour(tourId)
        .then((res) => {
          console.log(res);
          setInitialValues({
            ...initialValues,
            name: res.data.package_name,
            license: res.data.provider_license,
            from: res.data.from,
            to: res.data.to,
            cost: res.data.cost,
            description: res.data.description,
            tourId: tourId,
            days: res.data.total_days,
          });
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <AdminLayout>
      <ToastContainer />
      <FormikContainer
        className={"login"}
        initialValues={initialValues}
        formData={ADDTOUR_FORM_DATA}
        validationSchema={ADDTOUR_VALIDATION_SCHEMA}
        buttonName={tourId > 0 ? "Update Tour" : "Add Tour"}
        encType={"multipart/form"}
        apiCall={tourId > 0 ? updateTour : postTour}
        endPoint={tourId > 0 ? `/tour/update` : `/tour/add`}
        location={"/view/tours"}
        redirect={navigate}
      >
        {ADDTOUR_FORM_DATA.map((el, index) => (
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
    </AdminLayout>
  );
};

export default TourForm;
