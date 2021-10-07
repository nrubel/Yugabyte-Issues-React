import React from 'react';
import {Box, Typography} from "@mui/material";

const styles = {
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    maxWidth: 520,
    m: 'auto',
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#262626',
    m: 0,
    letterSpacing: 3,
    pl: 1,
  },
  main: {
    ml: -2.5,
    letterSpacing: -40,
    textTransform: 'uppercase',
    color: '#262626',
    fontWeight: 900,
    fontSize: 252,
    lineHeight: 0.9,
    fontFamily: 'Montserrat, Roboto, sans-serif',
    'span': {
      textShadow: '-8px 0 0 #fff',
    },
  },
  sorry: {
    fontFamily: `cabin, sans-serif`,
    fontSize: 20,
    fontWeight: 400,
    textTransform: 'uppercase',
  }
} as const

const Page404 = () => {
  return (
    <Box sx={styles.root}>
      <div className="notfound-404">
        <Typography component={'h3'} sx={styles.title}>Oops! Page not found</Typography>
        <Typography component={'h1'} sx={styles.main}>
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </Typography>
      </div>
      <Typography component={'h2'} sx={styles.sorry}>we are sorry, but the page you requested was not found</Typography>
    </Box>
  );
};

export default Page404;
