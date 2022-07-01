import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import TextError from "./TextError";

interface DateState {
  startDate: Date;
  endDate: Date | null;
  closedOn: Date | null;
}

function DateControl(props: any) {
  const { label, name, type, ...rest } = props;
  const [dates, setDate] = useState<DateState>({
    startDate: new Date(),
    endDate: null,
    closedOn: null,
  });
  const handleDateChange = (name: string | any, dates: Date | any) => {
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
        {({ form, field }: any) => {
          const { setFieldValue } = form;
          const { value } = field;
          return name !== "closedOn" ? (
            <ReactDatePicker
              className="form-control"
              minDate={new Date()}
              id={name}
              name={name}
              selected={value}
              value={name === "startDate" ? dates.startDate : dates.endDate}
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
              maxDate={dates.endDate}
              id={name}
              name={name}
              selected={value}
              value={dates.closedOn}
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
