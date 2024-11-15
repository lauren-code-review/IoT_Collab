'use client'

// Moon Phase

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Image from 'next/image';
import fullMoon from '@/public/images/full-moon.png'
import { useTheme } from '@mui/material/styles';

import { useWeatherData } from "../app/page";
/*Api needs to return moonPhase, moonRise, nextFullMoon, and nextNewMoon*/
/*Can we have a background photo of an empty moon and then fill it with the colored moon based on the percentage?*/

const card = (data) => {

  const theme = useTheme();

    return (
        <React.Fragment>
          <CardHeader sx={{bgcolor: theme.palette.primary.dark}} title="Moon Phase"/>
          <CardContent >
            <Fade in={true} timeout={5000}>
                <Image
                    src={fullMoon}
                    height={200}
                    width={200}
                    alt="Moon Phase"
                />
            </Fade>
            <Typography variant="body1">
              <br/>
              <br/>
              Current Phase: {data ? data.moonPhase : "No data to present"}
              <br/>
              Moonrise: 8:58 PM
              <br/>
              Next Full Moon: Friday, Nov 15 2024
              <br/>
              Next New Moon: Friday, Nov 1 2024
            </Typography>
          </CardContent>
        </React.Fragment>
    )

};
  
export default function MoonPhase() {
    const data = useWeatherData();

    const theme = useTheme();

    return (
      <Box>
        <Card variant="outlined" sx={{ borderColor: theme.palette.secondary.main }}>
          {card(data)}
        </Card>
      </Box>
    );
};
