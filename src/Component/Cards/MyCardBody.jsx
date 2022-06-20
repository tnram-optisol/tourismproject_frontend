import React from "react";
import { Typography } from "@mui/material";

export default function MyCardBody(props) {
  return (
    <Typography variant={props.variant} color={props.color}>
      {props.data}
    </Typography>
  );
}
