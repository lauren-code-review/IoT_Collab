'use client'

// Humidity

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Gauge } from '@mui/x-charts/Gauge';
import { useWeatherData } from "../app/page";
import { useTheme } from '@mui/material/styles';

/*Api needs to return humidity for the day*/

const card = (data) =>{

    const theme = useTheme();
    const hour = 13;
    return (
        <React.Fragment>
          <CardHeader sx={{bgcolor: theme.palette.primary.dark}} title="Humidity"/>
          <CardContent >
            <Gauge
            width={200}
            height={200}
            value={data ? data.hourly[hour].humidity : 0}
            startAngle={-110}
            endAngle={110}
            innerRadius="70%"
            outerRadius="100%"
            fill={theme.palette.primary.light}
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

    const theme = useTheme();

    return (
      <Box>
        <Card variant="outlined" sx={{ borderColor: theme.palette.secondary.main }}>
          {card(data)}
        </Card>
      </Box>
    );
}
