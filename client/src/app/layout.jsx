// layout

import React from "react"; 
import Footer from "@/components/Footer"; 
import Nav from "@/components/Nav"; 
const Layout = ({ children }) => { 
  return ( 
    <html> 
      <body>
        <Nav /> 
        {children} 
        <Footer /> 
      </body>
    </html> 
  ); 
}; 
  
export default Layout;
