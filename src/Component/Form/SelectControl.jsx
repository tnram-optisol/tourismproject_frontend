import React from "react";
import { ErrorMessage, Field, useField } from "formik";
import TextError from "./TextError";
import Select from "react-select";

function SelectControl(props) {
  const { label, name, options } = props;
  const [field, meta, helpers] = useField(props);
  const optionsData = new Array([]);
  if (options) {
    for (let option of options) {
      optionsData.push({ label: option.category, value: option.id });
    }
  }
  const category = [];
  const selectCategory = (event) => {
    for (let e of event) {
      if (!category.find((e) => e === e.value)) {
        category.push(e.value);
      }
    }
    return category;
  };
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <Select
              options={optionsData}
              onChange={(value) => setFieldValue(name, selectCategory(value))}
              isMulti
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

export default SelectControl;
