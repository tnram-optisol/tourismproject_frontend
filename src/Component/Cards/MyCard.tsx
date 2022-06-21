import { Card } from "@mui/material";
import React from "react";

function MyCard(props: { value?: any; children: any; key?: any }) {
  const { value, children, key } = props;
  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "5px",
        display: "inline-block",
      }}
      className="card-data"
      key={value | key}
    >
      {children}
    </Card>
  );
}

export default MyCard;
