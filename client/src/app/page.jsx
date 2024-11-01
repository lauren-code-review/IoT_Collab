// homepage
'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import Grid2 from '@mui/material/Grid2';
import Temperature from '@/components/Temperature'
import Humidity from '@/components/Humidity'
import Precipitation from '@/components/Precipitation'
import Forecast from '@/components/Forecast'
import Header, { getCookie } from '@/components/Header'
import Wind from '@/components/Wind'
import SunriseSunset from '@/components/SunriseSunset';
import MoonPhase from '@/components/MoonPhase'

const WeatherDataContext = createContext();

const getWeatherData = async () => {
    const state = getCookie("state");
    const city = getCookie("city");
    if (state && city) {
        const endpointUrl = "http://127.0.0.1:5885/weather/weather_by_city_state";
        const dataToSend = {State: state, City: city};

        const response = await fetch(endpointUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        })

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return await response.json();
    }
    return { data: "not working" };
};

const WeatherDataProvider = ({children}) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(()=> {
        const fetchData = async () =>{
            try{
                const data = await getWeatherData();
                setWeatherData(data);
            } catch (error) {
                console.error("Error fetching weather data", error);
            }
        };
        fetchData();
    }, []);

    return(
        <WeatherDataContext.Provider value={weatherData}>
            {children}
        </WeatherDataContext.Provider >
    )
};

export const useWeatherData = () => {
    return useContext(WeatherDataContext);
};

const HomePage = () => { 

    return ( 
        <WeatherDataProvider>
                <Header />
                <Grid2 container spacing={2}>
                  <Grid2 size={4}>
                    <Temperature/>
                    <Wind/>
                    <Precipitation/>
                  </Grid2>
                  <Grid2 size={4}>
                    <Humidity/>
                    <Forecast/>
                  </Grid2>
                  <Grid2 size={4}>
                    <SunriseSunset/>
                    <MoonPhase/>
                  </Grid2>
                </Grid2>
        </WeatherDataProvider>
    ) 
} 
  
export default HomePage
