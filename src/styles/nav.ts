const navItemStyle = {
  color: '#384248',
  fontWeight: 400,
  textDecoration: 'none',
  lineHeight: 1.2,
  fontSize: 14,
  '&.active': {
    fontWeight: 700,
  },
}

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
  icon: {
    mr: 1.5,
  },
  icon2: {
    mr: 2,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  avatarBtn: {
    p: 0,
  },
  menu: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
    'a': {
      ...navItemStyle,
    }
  },
  nav: {
    display: 'flex',
    '> a': {
      ...navItemStyle,
      mr: 4,
      lineHeight: 2.86,
      '&:last-of-type': {
        mr: 0,
      },
    },
  },
  navItem: {
    'a': navItemStyle
  }
} as const

export default styles