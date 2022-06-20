import { Box } from '@mui/material'
import React from 'react'

export default function AccessDenied(props: any){
    return(
        <Box>
            <h5 className='m-2 text-center '>
                Access Denied 
            </h5>
            <h5 className='m-2 text-center '>
                 Please Check Your routes
            </h5>
        </Box>
    )
}