import React from "react";
import { Typography } from "@mui/material";

export default function MyCardBody(props: {
  variant: "inherit" | "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | undefined;
  color:string
  data:
  | string
  | number
  | boolean
}) {
  return (
    <Typography variant={props.variant} color={props.color}>
      {props.data}
    </Typography>
  );
}
