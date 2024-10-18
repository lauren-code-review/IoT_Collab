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
    console.log(`Getting cookie with name: ${cname}`);
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
        return null;
    }
    return null;
};

const listenCookieChange = ( callback, interval = 1000 ) => {
    /* Checking the state of document.cookie every second */
    /* May be a better way of checking this */
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

const card = () => {

    const [city, setCity] = useState(null); /* This will change from the results of the search */
    const [state, setState] = useState(null); /* This will change from the results of the search */
    const [date, setDate] = useState(null); /* This will be gathered from the response fo the API query TODO*/
    const [time, setTime] = useState(null); /* This will change from the results of the search as well TODO*/
    /* Need to add a way of checking if the cookie is already set and then clearing the cookie if a new City/State is chosen*/ 

    listenCookieChange(()=>{
        const tempCity = getCookie("city");
        const tempState = getCookie("state");
        console.log('After getting cookies...');
        console.log(`City: ${tempCity}, State: ${tempState}`);
        setState(tempState);
        setCity(tempCity);
    });
    
    if (state && city ){
        return (
                <React.Fragment>
                    <CardContent>
                        Showing information for {city}, {state}
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

export default function Header({cityState}){

    return(
        <Box>
            <Card variant="outlined">
                {card(cityState)}
            </Card>
        </Box>
    )
}

