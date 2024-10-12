// Header (with dynamic date, time, and location of search);
// The Nav and InfoBrief are going to be rendered in using this Header component

'use client'

import {useState} from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";



const card = () => {

    const [city, setCity] = useState("Wichita");
    const [time, setState] = useState("11:04");
    const [date, setTime] = useState("10/03/2024");

    return (
        <React.Fragment>
            <CardContent>
                Showing information for {city} at {time} on {date} 
            </CardContent>
        </React.Fragment>
    )
}

export default function Header(){
    return(
        <Box>
            <Card variant="outlined">
                {card()}
            </Card>
        </Box>
    )
}
