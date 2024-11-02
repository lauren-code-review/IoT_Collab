'use client'

// Temperature

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Grid2';
import Image from 'next/image'
import placeholder from '@/public/images/placeholder-weather.png'
import { useWeatherData } from "../app/page";

const card = (data) => {
    return (
        <React.Fragment>
          <CardHeader title="Temperature"/>
          <CardContent sx={{ flexGrow: 1 }}>
            <Grid2 container spacing={2}>
                <Grid2 size={6}>
                    <Typography variant="body1">
                        {data ? data.description : "No data to present"}
                        <br />
                        Current: {data ? data.afternoon.temp : "No data to present"}
                        <br />
                        Feels like: {data ? data.afternoon.feelsLike : "No data to present"}
                        <br />
                        High: {data ? data.weeklyBreakdown[0].high : "No data to present"}
                        <br />
                        Low: {data ? data.weeklyBreakdown[0].low : "No data to present"}
                        <br />
                        Morning: {data ? data.morning.temp : "No data to present"}
                        <br />
                        Afternoon: {data ? data.afternoon.temp : "No data to present"}
                    </Typography>
                </Grid2>
                <Grid2 size={6}>
                    {/* <CardMedia
                    component="img"
                    height="137.5"
                    image="/placeholder-weather.png"
                    alt="Weather Icon"
                    /> */}
                    <Image
                    src={placeholder}
                    height={137.5}
                    width={137.5}
                    alt="Weather Icon"
                    />
                    <Typography variant="body1">
                        Evening Temp: { data ? data.evening.temp : 'No data to present'}
                        <br />
                        Night Temp: { data ? data.overnight.temp : 'No data to present'}
                    </Typography>
                </Grid2>
            </Grid2>
          </CardContent>
        </React.Fragment>
    );
};
  
export default function Temperature() {
    const data = useWeatherData();

    return (
      <Box>
        <Card variant="outlined">{card(data)}</Card>
      </Box>
    );
  }
