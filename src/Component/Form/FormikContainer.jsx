import React from "react";
import { Formik, Form } from "formik";
import { Button } from "@mui/material";
import FormControl from "./FormControl";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/reducers/authReducer";

function FormikContainer(props) {
  const {
    initialValues,
    validationSchema,
    formData,
    buttonName,
    apiCall,
    endPoint,
    encType,
    redirect,
    location,
    options,
  } = props;
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    console.log("Form Submitted", values);
    if (values.file) {
      let formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      apiCall(formData)
        .then((res) => {
          toast(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      apiCall(values)
        .then(async (res) => {
          if (endPoint === "/signIn") {
            localStorage.setItem("token", res.data.token);
            toast("Logged in Successfully");
            redirect("/");
            let user = await JSON.parse(
              atob(localStorage.getItem("token").split(".")[1])
            );
            dispatch(
              signIn({
                payload: user.role,
              })
            );
          } else {
            if (res.data.errors) {
              const data = res.data.errors;
              data.map((e) => toast.error(e.msg));
            } else {
              toast(res.data);
            }
            if (location) {
              redirect(location);
            }
          }
        })
        .catch((err) => {
          if (err.response.data.errors) {
            const data = err.response.data.errors;
            data.map((e) => toast.error(e.msg));
          } else {
            toast(err.response.data);
          }
          
        });
    }
  };
  const handleOnChange = (event) => {
    console.log(event.target.value);
  };
  return (
    <>
      <ToastContainer />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form
            className={props.className}
            encType={encType ? "multipart/form" : "application/json"}
          >
            {formData.map((el, index) => (
              <FormControl
                key={index}
                control={el.control}
                {...el}
                onChange={(event) => handleOnChange(event)}
                options={el.control === "select" ? options : ""}
              />
            ))}
            <Button
              type="submit"
              className="mt-2"
              variant="contained"
              color="success"
            >
              {buttonName}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default FormikContainer;
