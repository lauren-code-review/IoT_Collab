'use client'

// Precipitation

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Gauge } from '@mui/x-charts/Gauge';
import { useTheme } from '@mui/material/styles';
import { useWeatherData } from "../app/page";
/*Api needs to return todays Precipitation*/

const card = (data) => {
  const hour = 13;
  const theme = useTheme();

    return(
        <React.Fragment>
          <CardHeader sx={{bgcolor: theme.palette.primary.dark}} title="Precipitation"/>
          <CardContent >
            <Gauge
            width={200}
            height={200}
            value={data ? data.hourly[hour].precip : 0}
            startAngle={0}
            endAngle={360}
            innerRadius="70%"
            outerRadius="100%"
            text={ data ? `${data.hourly[hour].precip}%` : 'No data to present'}
            />
          </CardContent>
        </React.Fragment>
    );
}
  
export default function Precipitation() {
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
