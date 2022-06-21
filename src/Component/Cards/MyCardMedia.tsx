import React from "react";
import { CardMedia } from "@mui/material";

export default function MyCardMedia(props: { img: string ; alt: string ; }) {
  return (
    <CardMedia
      component="img"
      height="250"
      image={props.img}
      alt={props.alt}
      width="250"
      className={"hover-zoom"}
      loading="lazy"
    />
  );
}
