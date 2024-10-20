'use client'

// Moon Phase

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Fade from '@mui/material/Fade';
import Image from 'next/image';
import fullMoon from '@/public/images/full-moon.png'

const card = (
    <React.Fragment>
      <CardHeader title="Moon Phase"/>
      <CardContent >
        <Fade in={true} timeout={5000}>
            <Image
                src={fullMoon}
                height={200}
                width={200}
                alt="Moon Phase"
            />
        </Fade>
        <br/>
        <br/>
        Current Phase: Full Moon
        <br/>
        Moonrise: 8:58 PM
        <br/>
        Next Full Moon: Friday, Nov 15 2024
        <br/>
        Next New Moon: Friday, Nov 1 2024
      </CardContent>
    </React.Fragment>
  );
  
  export default function MoonPhase() {
    return (
      <Box>
        <Card variant="outlined">{card}</Card>
      </Box>
    );
  }