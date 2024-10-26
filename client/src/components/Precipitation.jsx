'use client'

// Precipitation

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Gauge } from '@mui/x-charts/Gauge';

const card = (
    <React.Fragment>
      <CardHeader title="Precipitation"/>
      <CardContent >
        <Gauge
        width={200}
        height={200}
        value={60}
        startAngle={0}
        endAngle={360}
        innerRadius="70%"
        outerRadius="100%"
        text={
            ({ value }) => `${value}%`
         }
        />
      </CardContent>
    </React.Fragment>
  );
  
  export default function Precipitation() {
    return (
      <Box>
        <Card variant="outlined">{card}</Card>
      </Box>
    );
  }