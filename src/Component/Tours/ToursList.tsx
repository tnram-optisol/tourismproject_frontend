import { Box } from "@mui/material";
import React from "react";

function ToursList(props: { children: any; }) {
  const { children } = props;
  return <Box>{children}</Box>;
}

export default ToursList;
