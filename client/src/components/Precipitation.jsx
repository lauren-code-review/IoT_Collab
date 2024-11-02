'use client'

// Precipitation

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Gauge } from '@mui/x-charts/Gauge';
import { useWeatherData } from "../app/page";
/*Api needs to return todays Precipitation*/

const card = (data) => {
    return(
        <React.Fragment>
          <CardHeader title="Precipitation"/>
          <CardContent >
            <Gauge
            width={200}
            height={200}
            value={data ? data.afternoon.precipitation : 0}
            startAngle={0}
            endAngle={360}
            innerRadius="70%"
            outerRadius="100%"
            text={ data ? `${data.afternoon.precipitation}%` : 'No data to present'}
            />
          </CardContent>
        </React.Fragment>
    );
}
  
export default function Precipitation() {
    const data = useWeatherData();

    return (
      <Box>
        <Card variant="outlined">{card(data)}</Card>
      </Box>
    );
}
