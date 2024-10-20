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
import { Grid2 } from '@mui/material';

const Sunrise = () => <Lottie animationData={sunriseAnimation} loop={true} />;

const Sunset = () => <Lottie animationData={sunsetAnimation} loop={true} />;

const card = (
        <React.Fragment>
            <CardHeader title="Sunrise & Sunset"/>
            <CardContent >
                <Grid2 container spacing={1}>
                    <Grid2 size={6}>
                        <Sunrise />
                        <br/>
                        Sunrise
                        <br/>
                        7:43 AM
                    </Grid2>
                    <Grid2 size={6}>
                        <Sunset/>
                        <br/>
                        Sunset
                        <br/>
                        6:44 PM
                    </Grid2>
                </Grid2>
            </CardContent>
        </React.Fragment>

);
  
  export default function SunriseSunset() {
    return (
      <Box>
        <Card variant="outlined">{card}</Card>
      </Box>
    );
  }