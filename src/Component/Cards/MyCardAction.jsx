import React from 'react';
import { Button, CardActions } from '@mui/material';

export default function MyCardAction(props){
    return(
        <CardActions className='m-auto'>
            <Button variant={props.variant} color={props.color} className="m-auto">
                {props.data}
            </Button>
        </CardActions>
    )
}