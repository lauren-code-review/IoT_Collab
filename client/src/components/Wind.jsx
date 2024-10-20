'use client'

// Wind

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Lottie from "lottie-react";
import windAnimation from '@/public/images/windAnimation.json';
import { Grid2 } from '@mui/material';

const WindAnimation = () => <Lottie animationData={windAnimation} loop={true} />;

const card = (
        <React.Fragment>
            <CardHeader title="Wind"/>
            <CardContent >
                <Grid2 container spacing={1}>
                    <Grid2 size={6}>
                        30
                        <br/>
                        MPH
                        <br/>
                        Wind Direction
                    </Grid2>
                    <Grid2 size={6}>
                        <WindAnimation/>
                    </Grid2>
                
                </Grid2>
            
            </CardContent>
        </React.Fragment>

);
  
  export default function Wind() {
    return (
      <Box>
        <Card variant="outlined">{card}</Card>
      </Box>
    );
  }