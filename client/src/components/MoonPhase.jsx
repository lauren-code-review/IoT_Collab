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
import { useWeatherData } from "../app/page";
/*Api needs to return moonPhase, moonRise, nextFullMoon, and nextNewMoon*/
/*Can we have a background photo of an empty moon and then fill it with the colored moon based on the percentage?*/

const card = (data) => {
    return (
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
            Current Phase: {data ? data.moonPhase : "No data to present"}
            <br/>
            Moonrise: 8:58 PM
            <br/>
            Next Full Moon: { data ? (data.fullMoon ? data.fullMoon : "More than 2 Weeks"): "No data to present" }
            <br/>
            Next New Moon: { data ? (data.newMoon ? data.newMoon : "More than 2 Weeks"): "No data to present" }
          </CardContent>
        </React.Fragment>
    )

};
  
export default function MoonPhase() {
    const data = useWeatherData();

    return (
      <Box>
        <Card variant="outlined">{card(data)}</Card>
      </Box>
    );
};
