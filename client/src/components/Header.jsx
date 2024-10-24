// Header (with dynamic date, time, and location of search);

'use client'

import {useState, useEffect, useContext} from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// Exporting the variables from the Nav object to use them in a query to the api for needed information
// Decided to add the City/State value in a cookie so that if the user opens the page again in the future it is already saved.
 
const getCookie = (cname) => {
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
}

const gTD = (timeStat) => { /*Get Time Display Value */
    const timeDisplay = (timeStat - 10) >= 0 ? timeStat :  `0${timeStat}`;
    return timeDisplay;
}

const checkCookies = (setCityCB, setStateCB, setTimeCB) => {
    const tempCity = getCookie("city");
    const tempState = getCookie("state");
    setCityCB(tempCity)
    setStateCB(tempState)
    const timeObj = new Date();
    const timeDisplay = `${gTD(timeObj.getHours())}:${gTD(timeObj.getMinutes())}:${gTD(timeObj.getSeconds())}`;
    setTimeCB(timeDisplay)
}


const card = () => {

    const [city, setCity] = useState(null); /* This will change from the results of the search */
    const [state, setState] = useState(null); /* This will change from the results of the search */
    const [date, setDate] = useState(null); /* This will be gathered from the response fo the API query TODO*/
    const [time, setTime] = useState(null); /* This will change from the results of the search as well */

    // listenCookieChange(()=>{
    //     const tempCity = getCookie("city");
    //     const tempState = getCookie("state");
    //     if (tempCity !== city || tempState !== state){
    //         setState(tempState);
    //         setCity(tempCity);
    //     };
    //     const timeObj = new Date();
    //     const timeDisplay = `${timeObj.getHours()}:${timeObj.getMinutes()}:${timeObj.getSeconds()}`;
    //     setTime(timeDisplay);
    // }, 500);

    setTimeout(() => {
        checkCookies(setCity, setState, setTime);
    }, 500);
    
    if (state && city ){
        return (
                <React.Fragment>
                    <CardContent>
                        Showing {time} information for {city}, {state}
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

