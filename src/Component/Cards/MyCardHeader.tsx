import React from 'react'
import { CardHeader } from "@mui/material";

export default function MyCardHeader(props: { title: string; }) {
    return (
        <CardHeader title={props.title} />
    )
}