import { Box } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { addRoom } from "Services/api/hotelAPI";
import { ADDROOM_FORM_DATA } from "utils/Form/formFields/formFields";
import { ADDROOM_INITIAL_VALUES } from "utils/Form/InitialValues/formInitial";
import { ADDROOM_VALIDATION_SCHEMA } from "utils/Form/ValidationSchema/formValidation";
import FormikContainer from "Component/Form/FormikContainer";
import AdminLayout from "Component/Wrapper/AdminLayout";
import FormControl from "Component/Form/FormControl";

function AddRoom() {
  let hotel:any = useParams();
  let hotelId = parseInt(hotel.id);
  const navigate = useNavigate();
  const initialValues = {
    ...ADDROOM_INITIAL_VALUES,
    hotel_id: hotelId,
  };

  return (
    <AdminLayout>
      <Box>
        <FormikContainer
          className={"login"}
          initialValues={initialValues}
          formData={ADDROOM_FORM_DATA}
          validationSchema={ADDROOM_VALIDATION_SCHEMA}
          encType={"multipart/form"}
          buttonName={"Add Room"}
          location={"/hotel/view/all"}
          redirect={navigate}
          apiCall={addRoom}
          endPoint={`/hotel/add/room`}
        >
          {ADDROOM_FORM_DATA.map((el, index) => (
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
    </AdminLayout>
  );
}

export default AddRoom;
