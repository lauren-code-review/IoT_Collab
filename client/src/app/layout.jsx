// layout
'use client'

import React from "react"; 
import Footer from "@/components/Footer"; 
import Nav from "@/components/Nav"; 
import Theme, { darkTheme } from "@/Theme"
import { getCookie } from  "@/components/Header";

const get_weather_data = async () => {
    const state = getCookie("state");
    const city = getCookie("city");
    const endpointUrl = "http://127.0.0.1:5885/weather/weather_by_city_state";
    const dataToSend = {State: state, City: city};
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const result = await response.json(); 
    return result;
}


const Layout = ({ children }) => { 

    return ( 
      <Theme >
        <html > 
          <body style={{background: darkTheme.palette.background.default}}>
            <Nav /> 
            {children} 
            <Footer /> 
          </body>
        </html> 
      </Theme>
        
    ); 
}; 
  
export default Layout;
