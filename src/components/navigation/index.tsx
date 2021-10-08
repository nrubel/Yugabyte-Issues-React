import React, {useState, MouseEvent, FC} from 'react';
import {Avatar, Box, Divider, Grid, IconButton, Menu, MenuItem, useMediaQuery} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationBell from "../icons/notification_bell";
import Info from "../icons/info";
import {Link, useRouteMatch} from "react-router-dom";
import theme from "../../utils/theme";
import styles from '../../styles/nav';

interface clProps {
  to: string,
}

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleClick2 = (event: MouseEvent<HTMLElement>) => setAnchorEl2(event.currentTarget);
  const handleClose2 = () => setAnchorEl2(null);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Grid container justifyContent={'space-between'} alignItems={'center'} sx={styles.root}>
      <Grid item>
        {
          matches
            ? <NavList/>
            : <IconButton onClick={handleClick2} size="small" sx={styles.avatarBtn}>
              <MenuIcon />
            </IconButton>
        }
      </Grid>
      <Grid item sx={styles.actions}>
        <IconButton sx={styles.icon}>
          <NotificationBell />
        </IconButton>
        <IconButton sx={styles.icon2}>
          <Info />
        </IconButton>
        <IconButton onClick={handleClick} size="small" sx={styles.avatarBtn}>
          <Avatar sx={styles.avatar}>
            <img src={`https://source.unsplash.com/mEZ3PoFGs_k/40x40`} alt="Avatar"/>
          </Avatar>
          <ArrowDropDownIcon />
        </IconButton>
      </Grid>
      {/* Dropdown menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{elevation: 0, sx: styles.menu,}}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <Divider />
        <MenuItem>Add another account</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
      {/* Dropdown menu */}
      <Menu
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose2}
        onClick={handleClose2}
        // PaperProps={{elevation: 0, sx: styles.menu,}}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuItem sx={styles.navItem}><CustomLink to={`/overview`}>Overview</CustomLink></MenuItem>
        <MenuItem sx={styles.navItem}><CustomLink to={`/`}>My tickets</CustomLink></MenuItem>
        <MenuItem sx={styles.navItem}><CustomLink to={`/archive`}>Archive</CustomLink></MenuItem>
        <MenuItem sx={styles.navItem}><CustomLink to={`/analytics`}>Analytics</CustomLink></MenuItem>
        <MenuItem sx={styles.navItem}><CustomLink to={`/reports`}>Reports</CustomLink></MenuItem>
        <MenuItem sx={styles.navItem}><CustomLink to={`/settings`}>Settings</CustomLink></MenuItem>
      </Menu>
    </Grid>
  );
};

const NavList = () => {
  return (
    <Box component={"nav"} sx={styles.nav}>
      <CustomLink to={`/overview`}>Overview</CustomLink>
      <CustomLink to={`/`}>My tickets</CustomLink>
      <CustomLink to={`/archive`}>Archive</CustomLink>
      <CustomLink to={`/analytics`}>Analytics</CustomLink>
      <CustomLink to={`/reports`}>Reports</CustomLink>
      <CustomLink to={`/settings`}>Settings</CustomLink>
    </Box>
  );
};

const CustomLink: FC<clProps> = ({to, children}) => {
  let match = useRouteMatch({
    path: to,
    exact: true
  });

  return (
    <Link to={to} {...(match && {className: `active`})}>{children}</Link>
  );
}

export default Navigation;