import { Card } from "@mui/material";
import React from "react";

function MyCard(props) {
  const { value, children } = props;
  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "5px",
        display: "inline-block",
      }}
      className="card-data"
      key={value}
    >
      {children}
    </Card>
  );
}

export default MyCard;
