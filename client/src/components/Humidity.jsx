'use client'

// Humidity

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Gauge } from '@mui/x-charts/Gauge';
import { useWeatherData } from "../app/page";
/*Api needs to return humidity for the day*/

const card = (data) =>{
    const hour = 13;
    return (
        <React.Fragment>
          <CardHeader title="Humidity"/>
          <CardContent >
            <Gauge
            width={200}
            height={200}
            value={data ? data.hourly[hour].humidity : 0}
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
    )
};
  
export default function Humidity() {
    const data = useWeatherData();

    return (
      <Box>
        <Card variant="outlined">{card(data)}</Card>
      </Box>
    );
}
