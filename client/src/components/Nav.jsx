'use client'

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useState, useEffect, useContext } from 'react';
import { States } from '../utils/listofstates';
import { Autocomplete } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import BasicMenu from './Menu';
import { useTheme } from '@mui/material/styles';
import { getCookie }from './Header.jsx';


/*Code that came from MUI Documentation for styling*/
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(1),
    width: '15%',
  },
}));

/*This is a function that is used so that the list of cities populates in the CitySearchAutocomplete component*/
async function getCitiesByState(state){
    const endpointUrl = "http://127.0.0.1:5885/location/get_list_of_cities";
    const dataToSend = {State: state};
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const result = await response.json(); 
    return result;
}

const get_weather_data = async (state, city) => {
    const endpointUrl = "http://127.0.0.1:5885/weather/weather_by_city_state";
    const dataToSend = {State: state, City: city};
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const result = await response.json(); 
    return result;
}

export const handleCSChange = async (state, city, possibleCities) => {
        if (States.includes(state) && possibleCities.includes(city)){ 
            /*On City Search change add a new state/city  to the cookies of their browser*/ 
            document.cookie = `state=${state};`;
            document.cookie = ` city=${city};`;
            console.log("Changed Current State to:", state);
            console.log("Changed Current City to:", city);
            document.location.reload();
        };
} 

export default function Nav() {

    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [possibleCities, setPossibleCities] = useState(["Choose a State"]);

    useEffect(() => {
      async function fetchCities() {
        if (States.includes(state)) {
          console.log(`State is set to ${state}`);
          try {
            const data = await getCitiesByState(state);
            console.log("Return of API query", data);
            setPossibleCities(data.cities); 
          } catch (error) {
            console.error("Error fetching cities:", error);
            setPossibleCities(["Error fetching cities"]); 
          }
        }
      };

      fetchCities(); 
    }, [state]); 

    useEffect(() => {
        handleCSChange(state, city, possibleCities);
    } , [city] );

    const theme = useTheme();

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{bgcolor: theme.palette.primary.main}}>
            <Toolbar>
            <BasicMenu />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Weather Dashboard
              </Typography>
              <Search>{/*Search box for the City requires State search to be completed*/}
                <Autocomplete
                    id="state-search-ac"
                    freeSolo
                    options={States.map((option) => option)}
                    onChange={(event, value) => setState(value)}/*Wondering if there is a better way to do this TODO*/
                    renderInput={(params) => <TextField {...params} label="State" varient="outlined" fullWidth/>}
                    sx={{ size:"large" }}
                  />
              </Search>
              <Search>{/*Search box for the City requires State search to be completed*/}
                <Autocomplete
                    id="city-search-ac"
                    freeSolo
                    options={possibleCities.map((option) => option)}
                    onChange={ (event, value) => value != getCookie("city") ? setCity(value) : null }/*Wondering if there is a better way to do this TODO*/
                    renderInput={(params) => <TextField {...params} label="City" varient="outlined" fullWidth/>}
                    sx={{ size:"large" }}
                  />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
    );
}

