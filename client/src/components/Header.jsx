// Header (with dynamic date, time, and location of search);
// The Nav and InfoBrief are going to be rendered in using this Header component

'use client'

import {useState} from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";



const card = () => {

    const [city, setCity] = useState(null); {/* This will change fromt he results of the search */}
    const [time, setState] = useState(null); {/* This will change from the results of the search as well */}
    const [date, setTime] = useState(null); {/* This will be gathered from the response fo the API query */}

    if (city && date && time){
        return (
            <React.Fragment>
                <CardContent>
                    Showing information for {city} at {time} on {date} 
                </CardContent>
            </React.Fragment>
        )
    }else{
        return (
            <React.Fragment>
                <CardContent>
                    No information to show yet...
                </CardContent>
            </React.Fragment>
        )
    }
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
