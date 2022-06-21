import { Alert } from "@mui/material";
import React from "react";

export const TextError: React.FunctionComponent<{}> = (props: { children?: string }) => {
  return (
    <>
      <Alert severity="error" className="mt-2">
        {props.children}
      </Alert>
    </>
  )
}
export default TextError;
