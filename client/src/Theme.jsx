'use client'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as React from 'react';

// Dark Mode:
// background: Jet 333333
// text: White Smoke F5F5F5
// purple: Eminence 732C79 rgb(115, 44, 121)
// blue: Caribbean Current 1A6975 rgb(26, 105, 117)
// gray: Outer Space 474747

// Light Mode:
// background: White Smoke F5F5F5
// text: Jet 333333
// purple: Thistle DCC0DA rgb(220, 192, 218)
// blue: Non Photo Blue 9BDEE8 rgb(155, 222, 232)
// gray: Timberwolf D6D6D6

// accent-primary: Tiffany Blue 68DBDF
// accent-secondary: Lavender (floral) B07BE3

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1A6975',
      light: '#68DBDF',
      dark: 'rgba(26, 105, 117, 0.6)',
    },
    secondary: {
      main: '#732C79',
      light: '#B07BE3',
      dark: 'rgba(115, 44, 121, 0.6)'
    },
    grey: {
      main: '#474747',
    },
    text: {
      primary: '#F5F5F5',
    },
    background: {
      paper: '#474747',
      default: '#333333',
    },
  },
});

export default function Theme({
  children,
}) {
  return (
    <ThemeProvider theme={darkTheme}>
      {children}
    </ThemeProvider>
  )
} 