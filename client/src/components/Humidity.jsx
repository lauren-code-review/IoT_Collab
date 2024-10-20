'use client'

// Humidity

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Gauge } from '@mui/x-charts/Gauge';

const card = (
    <React.Fragment>
      <CardHeader title="Humidity"/>
      <CardContent >
        <Gauge
        width={200}
        height={200}
        value={60}
        startAngle={-110}
        endAngle={110}
        innerRadius="70%"
        outerRadius="100%"
        text={
            ({ value }) => `${value}%`
         }
        />
      </CardContent>
    </React.Fragment>
  );
  
  export default function Humidity() {
    return (
      <Box>
        <Card variant="outlined">{card}</Card>
      </Box>
    );
  }