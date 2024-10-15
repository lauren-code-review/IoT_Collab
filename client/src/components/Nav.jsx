'use client'

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Autocomplete } from '@mui/material';
import BasicMenu from './Menu';
import { States } from '../utils/listofstates.jsx';

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

    const result = await response.json(); // Parse the JSON
    return result;
}

export default function Nav() {
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [possibleCities, setPossibleCities] = useState(["Choose a State", ""])

    useEffect(() => {
      const fetchCities = async () => {
        if (States.includes(state)) {
          console.log(`State is set to ${state}`);
          try {
            const cities = await getCitiesByState(state);
            console.log("Return of API query", cities.cities);
            setPossibleCities(cities.cities); // Update state with the API response
          } catch (error) {
            console.error("Error fetching cities:", error);
            setPossibleCities(["Error fetching cities"]); // Handle error case
          }
        }
      };

      fetchCities(); // Call the async function
    }, [state]); // Re-run effect when 'state' changes

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
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
                    onChange={e => setState(e.target.value)}
                    renderInput={(params) => <TextField {...params} label="State" />}
                    sx={{ size:"large" }}
                  />
              </Search>
              <Search>{/*Search box for the City requires State search to be completed*/}
                <Autocomplete
                    id="city-search-ac"
                    freeSolo
                    options={possibleCities.map((option) => option)}
                    renderInput={(params) => <TextField {...params} label="City" />}
                    sx={{ size:"large" }}
                  />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
    );
}

