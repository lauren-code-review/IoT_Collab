// Header (with dynamic date, time, and location of search);

'use client'

import {useState, useEffect, useContext} from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useWeatherData } from "../app/page";

// Exporting the variables from the Nav object to use them in a query to the api for needed information
// Decided to add the City/State value in a cookie so that if the user opens the page again in the future it is already saved.
 
export function getCookie(cname) {
    let name = cname;
    let cookies = document.cookie.split(";");
    if(cookies){
        for (let i = 0; i < cookies.length; i++){
            let cPair = cookies[i].trim().split("=")
            if (cPair.length > 1) {
                if (cPair[0] == name){
                    return cPair[1];
                }
            }
        }
    }
    return null;
};

const listenCookieChange = ( callback, interval = 1000 ) => {
    /* Need a better way of checking for state changes on document.cookie */
    let lastCookie = document.cookie;
    setInterval(()=> {
        let cookie = document.cookie;
        if (cookie !== lastCookie) {
            try {
                callback({oldValue: lastCookie, newValue: cookie});
            } finally {
                lastCookie = cookie;
            }
        }
    }, interval);
};

const gTD = (timeStat) => { /*Get Time Display Value */
    const timeDisplay = (timeStat - 10) >= 0 ? timeStat :  `0${timeStat}`;
    return timeDisplay;
};

const checkCookies = (setCityCB, setStateCB, setTimeCB) => {
    const tempCity = getCookie("city");
    const tempState = getCookie("state");
    setCityCB(tempCity)
    setStateCB(tempState)
    const timeObj = new Date();
    const timeDisplay = `${gTD(timeObj.getHours())}:${gTD(timeObj.getMinutes())}:${gTD(timeObj.getSeconds())}`;
    setTimeCB(timeDisplay)
};


const card = (data)=> {
    const [city, setCity] = useState(null); /* This will change from the results of the search */
    const [state, setState] = useState(null); /* This will change from the results of the search */
    const [date, setDate] = useState(null); /* This will be gathered from the response fo the API query TODO*/
    const [time, setTime] = useState(null); /* This will change from the results of the search as well */
    
    setTimeout(() => {
        checkCookies(setCity, setState, setTime);
    }, 500);

    return( state && city ? (
                    <React.Fragment>
                        <CardContent>
                            Showing {time} information for {city}, {state}
                        </CardContent>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <CardContent>
                            Please select a City & State
                        </CardContent>
                    </React.Fragment>
                )
        
    )
};

export default function Header(){
    const data = useWeatherData(); /*Using the data queried on load from page.jsx*/
    console.log(data);

    return(
        <Box>
            <Card variant="outlined">
                {card(data)}
            </Card>
        </Box>
    )
};

