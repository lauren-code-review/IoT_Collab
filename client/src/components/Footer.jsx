// Footer
'use client'

import {useState} from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
const card = (
   <React.Fragment> 
        <CardContent>
            Developed by Lauren, Andria, and Chanse
        </CardContent>
   </React.Fragment> 
)
export default function Footer(){
    return(
        <Box>
            <Card variant="outlined">
                {card}
            </Card>
        </Box>
    )
}
