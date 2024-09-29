// layout

import React from "react"; 
  
const Nav = () => { 
  return <h3>This is Nav</h3>; 
}; 
  
const Footer = () => { 
  return <h3>This is Footer</h3>; 
}; 
  
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