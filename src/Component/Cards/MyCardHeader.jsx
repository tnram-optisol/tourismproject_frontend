import React from 'react'
import { CardHeader } from "@mui/material";

export default function MyCardHeader(props){
    return(
        <CardHeader title={props.title}/>
    )
}