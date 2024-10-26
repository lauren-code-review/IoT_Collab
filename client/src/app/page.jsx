// homepage
'use client'

import React from 'react';
import Grid2 from '@mui/material/Grid2';
import Temperature from '@/components/Temperature'
import Humidity from '@/components/Humidity'
import Precipitation from '@/components/Precipitation'
import Forecast from '@/components/Forecast'
import Header from '@/components/Header'
import Wind from '@/components/Wind'
import SunriseSunset from '@/components/SunriseSunset';
import MoonPhase from '@/components/MoonPhase'

const HomePage = () => { 
  return ( 
    // Header will go here
    <div>
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
    </div>
  ) 
} 
  
export default HomePage
