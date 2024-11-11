'use client'

// Wind

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Lottie from "lottie-react";
import windAnimation from '@/public/images/windAnimation.json';
import { useTheme } from '@mui/material/styles';
import { Grid2 } from '@mui/material';
import { useWeatherData } from "../app/page";

/*Api needs to return windSpeed and windDirection*/

const WindAnimation = () => <Lottie animationData={windAnimation} loop={true} />;

const card = (data) => {

    const theme = useTheme();

    return (
        <React.Fragment>
            <CardHeader sx={{bgcolor: theme.palette.primary.dark}} title="Wind"/>
            <CardContent >
                <Grid2 container spacing={1}>
                    <Grid2 size={6}>
                    <Typography variant="body1">
                        Wind Speed: {data ? data.windSpeed : "No data to present"} MPH
                        <br/>
                        Wind Direction: {data ? data.windDir : "No data to present"}
                    </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <WindAnimation/>
                    </Grid2>
                </Grid2>
            </CardContent>
        </React.Fragment>
    );
};
  
export default function Wind() {
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
