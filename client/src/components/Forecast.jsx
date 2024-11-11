'use client'

// 7 Day Forecast

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import Image from 'next/image';
import placeholder from '@/public/images/placeholder-weather.png';
import { useTheme } from '@mui/material/styles';

// import { dataset, valueFormatter } from '../dataset/weather';

const chartSetting = {
  yAxis: [
    {
      label: 'Temperature (°F)',
    },
  ],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

const card = () => {

  const theme = useTheme();

  return (
    <React.Fragment>
      <CardHeader sx={{bgcolor: theme.palette.primary.dark}} title="7 Day Forecast"/>
      <CardContent >
        <BarChart
            xAxis={[{ 
              scaleType: 'band', 
              data: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
               }]
              }
            
            series={
                [
                { 
                    color: theme.palette.primary.light,
                    data: [-20, 0, 20, 40, 60, 90, 120] 
                },
                {
                    color: theme.palette.secondary.light,
                    data: [0, 20, 40, 60, 90, 120, 140] 
                }
            ]}
            {...chartSetting}
        />
        <Typography variant="body1">
            Monday -20 °F
            <Image
                src={placeholder}
                height={35}
                width={35}
                alt="Weather Icon"
                />
            <br />
            Tuesday 0 °F
            <Image
                src={placeholder}
                height={35}
                width={35}
                alt="Weather Icon"
                />
            <br />
            Wednesday 20 °F
            <Image
                src={placeholder}
                height={35}
                width={35}
                alt="Weather Icon"
                />
            <br />
            Thursday 40 °F
            <Image
                src={placeholder}
                height={35}
                width={35}
                alt="Weather Icon"
                />
            <br />
            Friday 60 °F
            <Image
                src={placeholder}
                height={35}
                width={35}
                alt="Weather Icon"
                />
            <br />
            Saturday 90 °F
            <Image
                src={placeholder}
                height={35}
                width={35}
                alt="Weather Icon"
                />
            <br/>
            Sunday 120 °F
            <Image
                src={placeholder}
                height={35}
                width={35}
                alt="Weather Icon"
                />
        </Typography>
      </CardContent>
    </React.Fragment>
  )};

export default function Forecast() {

  const theme = useTheme();

  return (
    <Box>
        <Card variant="outlined" sx={{ borderColor: theme.palette.secondary.main }}>
          {card()}
        </Card>
    </Box>
  );
}
