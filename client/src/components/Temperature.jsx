'use client'

// Temperature

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Grid2';
import Image from 'next/image';
import placeholder from '@/public/images/placeholder-weather.png'
import { useTheme } from '@mui/material/styles';
import { useWeatherData } from "../app/page";

const card = (data, theme) => {
    const hour = 13;

    return (
        <React.Fragment>
          <CardHeader sx={{bgcolor: theme.palette.primary.dark}} title="Temperature"/>
          <CardContent sx={{ flexGrow: 1 }}>
            <Grid2 container spacing={2}>
                <Grid2 size={6}>
                    <Typography variant="body1">
                        {data ? data.description : "No data to present"}
                        <br />
                        Current: {data ? data.hourly[hour].temp : "No data to present"}
                        <br />
                        Feels like: {data ? data.hourly[hour].feelslike : "No data to present"}
                        <br />
                        High: {data ? data.high : "No data to present"}
                        <br />
                        Low: {data ? data.low : "No data to present"}
                        <br />
                    </Typography>
                </Grid2>
                <Grid2 size={6}>
                    <Image
                    src= { placeholder }
                    height={137.5}
                    width={137.5}
                    alt="Weather Icon"
                    />
                    <Typography variant="body1">
                        Morning: {data ? (data.forecasts.morning ? data.forecasts.morning : "No data to present"): "No data to present"}
                        <br />
                        Afternoon: {data ? (data.forecasts.afternoon ? data.forecasts.afternoon : "No data to present") : "No data to present"}
                        <br />
                        Evening Temp: { data ? (data.forecasts.evening ? data.forecasts.evening : "No data to present") : 'No data to present'}
                        <br />
                        Night Temp: { data ? (data.forecasts.overnight ? data.forecasts.overnight : "No data to present") : 'No data to present'}
                    </Typography>
                </Grid2>
            </Grid2>
          </CardContent>
        </React.Fragment>
    );
};
  
export default function Temperature() {
    const data = useWeatherData();
    const theme = useTheme();
    
    return (
      <Box>
        <Card variant="outlined" sx={{ borderColor: theme.palette.secondary.main }}>
          {card(data, theme)}
        </Card>
      </Box>
    );
  }
