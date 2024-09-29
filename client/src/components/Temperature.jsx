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

const card = (
    <React.Fragment>
      <CardHeader title="Temperature"/>
      <CardContent sx={{ flexGrow: 1 }}>
        <Grid2 container spacing={2}>
            <Grid2 size={6}>
                <Typography variant="body1">
                    Weather description
                    <br />
                    Current temp
                    <br />
                    Feels like temp
                    <br />
                    High/Low temp
                    <br />
                    Morning temp
                    <br />
                    Afternoon temp
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
                    Evening temp
                    <br />
                    Night temp
                </Typography>
            </Grid2>
        </Grid2>
      </CardContent>
    </React.Fragment>
  );
  
  export default function Temperature() {
    return (
      <Box>
        <Card variant="outlined">{card}</Card>
      </Box>
    );
  }