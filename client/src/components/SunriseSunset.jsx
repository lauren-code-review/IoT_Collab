'use client'

// Sunrise and Sunset

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Lottie from "lottie-react";
import sunriseAnimation from '@/public/images/sunrise-animation.json';
import sunsetAnimation from '@/public/images/sunset-animation.json';
import { useTheme } from '@mui/material/styles';
import { useWeatherData } from "../app/page";
import { Grid2 } from '@mui/material';

/*Api needs to return today's sunrise and sunset*/

const Sunrise = () => <Lottie animationData={sunriseAnimation} loop={true} />;

const Sunset = () => <Lottie animationData={sunsetAnimation} loop={true} />;

const card = (data) => {

    const theme = useTheme();

    return(
        <React.Fragment>
            <CardHeader sx={{bgcolor: theme.palette.primary.dark}} title="Sunrise & Sunset"/>
            <CardContent >
                <Grid2 container spacing={1}>
                    <Grid2 size={6}>
                        <Sunrise />
                        <Typography variant="body1">
                            <br/>
                            Sunrise
                            <br/>
                            {data ? data.sunrise : "No data to present"}
                        </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <Sunset/>
                        <Typography variant="body1">
                            <br/>
                            Sunset
                            <br/>
                            {data ? data.sunset : "No data to present"}
                        </Typography>
                    </Grid2>
                </Grid2>
            </CardContent>
        </React.Fragment>
    );
};
  
export default function SunriseSunset() {
    const data = useWeatherData();

    const theme = useTheme();

    return (
      <Box>
        <Card variant="outlined" sx={{ borderColor: theme.palette.secondary.main }}>
            {card(data)}
        </Card>
      </Box>
    );
};
