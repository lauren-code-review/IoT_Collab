// layout
'use client'


import React from "react"; 
import Footer from "@/components/Footer"; 
import Nav from "@/components/Nav"; 
import Header from "@/components/Header"; 
import { createContext, useState } from 'react';

const Layout = ({ children }) => { 
    
    return ( 
        <html> 
          <body>
                <Nav /> 
                <Header />
                {children} 
                <Footer /> 
          </body>
        </html> 
    ); 
}; 
  
export default Layout;
