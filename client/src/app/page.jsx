// homepage

import React from 'react'
import Grid2 from '@mui/material/Grid2';
import Temperature from '@/components/Temperature'
import Humidity from '@/components/Humidity'
import Precipitation from '@/components/Precipitation'
import Forecast from '@/components/Forecast'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const HomePage = () => { 
  return ( 
    // Header will go here
    <div>
    <Header />
    <Grid2 container spacing={2}>
      <Grid2 size={4}>
        <Temperature/>
        <Humidity/>
        <Precipitation/>
      </Grid2>
      <Grid2 size={4}>
        <Forecast/>
      </Grid2>
      {/* <Grid2>
        lauren components here
      </Grid2> */}
    </Grid2>
    </div>
  ) 
} 
  
export default HomePage
