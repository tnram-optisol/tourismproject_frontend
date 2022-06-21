import React from "react";
import { Button, CardActions } from "@mui/material";

export default function MyCardAction(props: {
    variant: "text" | "outlined" | "contained" | undefined;
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined;
    data:
    | string
    | number
    | boolean
}) {
    return (
        <CardActions className="m-auto">
            <Button variant={props.variant} color={props.color} className="m-auto">
                {props.data}
            </Button>
        </CardActions>
    );
}
