import { Box, Skeleton } from "@mui/material";
import React from "react";

function Loader() {
  return (
    <Box className="tab_row">
      <Skeleton width={"100%"} animation="wave" />
      <Skeleton width={"100%"} animation="wave" />
      <Skeleton width={"100%"} animation="wave" />
      <Skeleton width={"100%"} animation="wave" />
      <Skeleton width={"100%"} animation="wave" />
      <Skeleton width={"100%"} animation="wave" />
    </Box>
  );
}

export default Loader;
