// Footer
'use client'

import {useState} from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import CardContent from "@mui/material/CardContent";
import { useTheme } from '@mui/material/styles';

const card = () => {

    const theme = useTheme();

    return(
   <React.Fragment> 
        <CardContent sx={{bgcolor:theme.palette.secondary.dark}}>
        <Typography variant="body1">
            Developed by Lauren, Andria, and Chanse
        </Typography>
        </CardContent>
   </React.Fragment> 
)}

export default function Footer(){

    const theme = useTheme();

    return(
        <Box>
            <Card variant="outlined" sx={{ borderColor: theme.palette.secondary.main }}>
                {card()}
            </Card>
        </Box>
    )
}
