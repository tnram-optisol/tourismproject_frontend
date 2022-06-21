import React from "react";
import DateControl from "./DateControl";
import FileInput from "./FileInput";
import InputControl from "./InputControl";
import OptionsControl from "./OptionsControl";
import SelectControl from "./SelectControl";
import TextAreaControl from "./TextAreaControl";

function FormControl(props:any) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <InputControl {...rest} />;
    case "textarea":
      return <TextAreaControl {...rest} />;
    case "date":
      return <DateControl {...rest} />;
    case "file":
      return <FileInput {...rest} />;
    case "select":
      return <SelectControl {...rest} />;
    case "options":
      return <OptionsControl {...rest} />;
    default:
      return null;
  }
}

export default FormControl;
