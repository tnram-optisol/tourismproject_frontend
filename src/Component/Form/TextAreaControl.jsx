import { ErrorMessage, Field, useField } from "formik";
import React from "react";
import TextError from "./TextError";

function TextAreaControl(props) {
  const { label, name, ...rest } = props;
  const [field, meta, helpers] = useField(props);
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field
        as="textarea"
        id={name}
        name={name}
        placeholder={`Enter ${label}`}
        className="form-control"
      />
      {meta.error && meta.touched ? (
        <ErrorMessage name={name} component={TextError} />
      ) : null}
    </div>
  );
}

export default TextAreaControl;
