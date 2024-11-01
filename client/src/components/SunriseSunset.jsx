'use client'

// Sunrise and Sunset

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Lottie from "lottie-react";
import sunriseAnimation from '@/public/images/sunrise-animation.json';
import sunsetAnimation from '@/public/images/sunset-animation.json';
import { useWeatherData } from "../app/page";
import { Grid2 } from '@mui/material';

/*Api needs to return today's sunrise and sunset*/

const Sunrise = () => <Lottie animationData={sunriseAnimation} loop={true} />;

const Sunset = () => <Lottie animationData={sunsetAnimation} loop={true} />;

const card = (data) => {

    return(
        <React.Fragment>
            <CardHeader title="Sunrise & Sunset"/>
            <CardContent >
                <Grid2 container spacing={1}>
                    <Grid2 size={6}>
                        <Sunrise />
                        <br/>
                        Sunrise
                        <br/>
                        {data ? data.sunrise : "No data to present"}
                    </Grid2>
                    <Grid2 size={6}>
                        <Sunset/>
                        <br/>
                        Sunset
                        <br/>
                        {data ? data.sunset : "No data to present"}
                    </Grid2>
                </Grid2>
            </CardContent>
        </React.Fragment>
    );
};
  
export default function SunriseSunset() {
    const data = useWeatherData();

    return (
      <Box>
        <Card variant="outlined">{card(data)}</Card>
      </Box>
    );
};
