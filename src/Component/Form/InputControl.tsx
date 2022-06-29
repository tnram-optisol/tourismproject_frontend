import React from "react";
import { Field, ErrorMessage, useField } from "formik";
import TextError from "./TextError";
import { Rating } from "@mui/material";

function InputControl(props: any) {
  const { label, name, type, ...rest } = props;
  const [field, meta, helpers] = useField(props);
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <Field name={name}>
        {({ form, field }: any) => {
          const { setFieldValue } = form;
          const { value } = field;
          return name !== "rating" ? (
            <input
              className="form-control"
              type={type}
              {...field}
              {...rest}
              placeholder={`Please enter ${name}`}
              onChange={(event) => setFieldValue(name, event.target.value)}
            />
          ) : (
            <Rating
              name={name}
              value={value}
              className="d-block m-1"
              onChange={(event, newValue) => {
                setFieldValue(name, newValue);
              }}
            />
          );
        }}
      </Field>
      {meta.error && meta.touched ? (
        <ErrorMessage name={name} component={TextError} />
      ) : null}
    </div>
  );
}

export default InputControl;
