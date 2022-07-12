import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import "./Forms.css";

import FormikContainer from "Component/Form/FormikContainer";
import { SIGNUP_FORM_DATA } from "utils/Form/formFields/formFields";
import { SIGNUP_INITIAL_VALUES } from "utils/Form/InitialValues/formInitial";
import { SIGNUP_VALIDATION_SCHEMA } from "utils/Form/ValidationSchema/formValidation";
import UserLayout from "Component/Wrapper/UserLayout";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { getUserProfileData } from "store/reducers/userReducer";
import { updateUser } from "Services/api/userAPI";

export default function UpdateProfile(props: any) {
  const dispatch = useAppDispatch();
  const myProfile = useAppSelector((state) => state.user.value.userData);
  const loading = useAppSelector((state) => state.user.value.loading);
  const [initialValues, setInitialValues] = useState({
    ...SIGNUP_INITIAL_VALUES,
    roleId: myProfile[0].role.id,
  });
  const navigate = useNavigate();
  const updateUserData = () => {
    dispatch(getUserProfileData());
  };
  useEffect(() => {
    updateUserData();
    setInitialValues({
      ...initialValues,
      name: myProfile[0].name,
      contact: `${myProfile[0].contact}`,
      email: myProfile[0].email,
      place: myProfile[0].place,
      roleId: myProfile[0].role.id,
    });
  }, [updateUser]);
  return (
    <UserLayout>
      <Box className="signup">
        <FormikContainer
          className={"signup"}
          initialValues={initialValues}
          formData={SIGNUP_FORM_DATA}
          validationSchema={SIGNUP_VALIDATION_SCHEMA}
          buttonName={"Update"}
          endPoint={"/signUp"}
          apiCall={updateUser}
          redirect={navigate}
          location={"/my/profile"}
        />
      </Box>
    </UserLayout>
  );
}
