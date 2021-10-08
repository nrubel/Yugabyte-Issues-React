import React, {FC} from 'react';
import {Box} from "@mui/material";
import {Link, useRouteMatch} from 'react-router-dom';

const styles = {
  nav: {
    display: 'flex',
    '> a': {
      mr: 4,
      color: '#384248',
      fontWeight: 400,
      textDecoration: 'none',
      lineHeight: 2.86,
      fontSize: 14,
      '&:last-of-type': {
        mr: 0,
      },
      '&.active': {
        fontWeight: 700,
      },
    },
  },
} as const

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

interface iProps {
  to: string,
}

const CustomLink: FC<iProps> = ({to, children}) => {
  let match = useRouteMatch({
    path: to,
    exact: true
  });

  return (
    <Link to={to} {...(match && {className: `active`})}>{children}</Link>
  );
}

export default NavList;