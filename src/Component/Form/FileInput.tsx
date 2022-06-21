import React from "react";
import { ErrorMessage, Field } from "formik";
import TextError from "./TextError";

function FileInput(props:any) {
  const { label, name, value, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field }:any) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <input
              type="file"
              id={name}
              name={name}
              selected={value}
              accept="image/*"
              {...rest}
              onChange={(event) => setFieldValue(name, event.target.files![0])}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default FileInput;
