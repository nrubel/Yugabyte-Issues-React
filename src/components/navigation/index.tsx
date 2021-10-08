import React from 'react';
import {Grid, IconButton} from "@mui/material";
import NavList from "./list";
import NavProfile from "./profile";
import NotificationBell from "../icons/notification_bell";
import Info from "../icons/info";

const styles = {
  root: {
    p: 1,
    pl: 3,
    pr: 3,
    boxShadow: '0px 1px 0px #D1D1D1',
    backgroundColor: 'white',
  },
  actions: {
    display: 'inline-flex'
  },
} as const

const Navigation = () => {
  return (
    <Grid container justifyContent={'space-between'} sx={styles.root}>
      <Grid item>
        <NavList/>
      </Grid>
      <Grid item sx={styles.actions}>
        <IconButton>
          <NotificationBell />
        </IconButton>
        <IconButton>
          <Info />
        </IconButton>
        <NavProfile/>
      </Grid>
    </Grid>
  );
};

export default Navigation;