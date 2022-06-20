import { Alert } from "@mui/material";
import React from "react";

function TextError(props) {
  return (
    <Alert severity="error" className="error m-2">
      {props.children}
    </Alert>
  );
}

export default TextError;
