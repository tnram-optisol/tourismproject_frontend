import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import TextError from "./TextError";

function DateControl(props) {
  const { label, name, type, ...rest } = props;
  const [dates, setDate] = useState({
    startDate: new Date(),
    endDate: null,
  });
  const handleDateChange = (name, dates) => {
    setDate({
      ...dates,
      [name]: dates,
    });
    return dates;
  };
  return (
    <div className="d-inline">
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return name !== "closedOn" ? (
            <ReactDatePicker
              className="form-control"
              minDate={new Date()}
              id={name}
              name={name}
              selected={value}
              value={dates[name]}
              {...field}
              {...rest}
              onChange={(val) =>
                setFieldValue(name, handleDateChange(name, val))
              }
            />
          ) : (
            <ReactDatePicker
              className="form-control"
              minDate={new Date()}
              id={name}
              name={name}
              selected={value}
              value={dates[name]}
              {...field}
              {...rest}
              onChange={(val) =>
                setFieldValue(name, handleDateChange(name, val))
              }
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default DateControl;
