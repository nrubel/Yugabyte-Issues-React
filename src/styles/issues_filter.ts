const styles = {
  root: {
    py: 3.5,
  },
  title: {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'Source Sans Pro, Roboto, sans-serif',
    fontWeight: 600,
    fontSize: 32,
    lineHeight: 1,
  },
  btn: {
    backgroundColor: '#f8f8f8',
    border: '1px solid #DEDEDE',
    boxShadow: '0px 1px 0px rgba(61, 47, 38, 0.15), inset 0px 1px 1px rgba(255, 255, 255, 0.08)',
    borderRadius: .5,
    p: 1.25,
    pr: 1.5,
    color: '#384248',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 1.5,
    letterSpacing: 0.15,
    fontFeatureSettings: `'pnum' on, 'lnum' on`,
    ml: 2,
    '> svg': {
      mr: 1,
    },
    '> .MuiSelect-select': {
      p: 0
    },
    '&::before': {
      borderBottom: 0,
    }
  },
} as const

export default styles