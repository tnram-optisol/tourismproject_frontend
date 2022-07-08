import { Alert } from "@mui/material";
import React from "react";

export const TextError: React.FunctionComponent<{}> = (props: {
  children?: string;
}) => {
  return (
    <>
      <Alert variant="filled" severity="error" className="mt-2 alert-danger">
        {props.children}
      </Alert>
    </>
  );
};
export default TextError;
