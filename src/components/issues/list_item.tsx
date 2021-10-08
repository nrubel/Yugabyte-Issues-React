import React, {FC, Fragment, useState} from 'react';
import {Issue, Label} from "../../recoil/models";
import {Avatar, Box, Checkbox, Chip, Grid, Link, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import {useRecoilState} from "recoil";
import {userState} from "../../recoil/atoms";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

const classes = {
  root: {
    p: 3,
    pl: 2,
    pr: 6,
    boxShadow: '0px 1px 4px rgba(63, 63, 68, 0.15), 0px 0px 1px rgba(0, 0, 0, 0.5)',
    borderRadius: 0.5,
    backgroundColor: 'white',
    mb: 2,
  },
  avatar: {
    width: 54,
    height: 54,
  },
  title: {
    my: 1,
    fontWeight: 500,
    fontSize: 16,
    color: '#384248',
  },
  foot: {
    fontSize: 14,
    lineHeight: 1.6,
    color: '#505862',
    letterSpacing: 0.15,
  },
  dot: {
    width: 7,
    height: 7,
    backgroundColor: '#A1AAB3',
    borderRadius: 7,
    mx: 1,
  },
  priorityColor: {
    height: 5,
    width: 16,
    borderRadius: 0.5,
    mx: 1.5,
  },
  priorityBox: {
    alignItems: 'center',
    display: 'inline-flex',
    py: 1,
    pr: 4,
    color: '#505862',
  },
  prioritySelect: {
    minWidth: 168,
    mr: 2,
    '> .MuiSelect-select': {
      p: 0.2
    },
  },
  chip: {
    borderRadius: 0.5,
    lineHeight: 1.9,
    fontSize: 11,
    p: 0,
    height: 'auto',
    mr: 1,
    '> span': {
      pl: 1,
      pr: 1,
      fontFeatureSettings: `'pnum' on, 'lnum' on`,
    }
  },
  userBox: {
    border: '1px solid #C4C4C4',
    borderRadius: 0.5,
    pl: 2.3,
    pr: 5,
    minHeight: 42,
    display: 'inline-flex',
    color: '#505862',
    alignItems: 'center',
    minWidth: 250,
    'svg': {
      mr: 2,
    },
  },
} as const

const OpenIcon = () => (
  <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.21522 4.04432L10.4346 13.8896L13.0078 7.88469H16.0605V6.47822H12.0809L10.4346 10.3186L6.21522 0.473297L3.64208 6.47822H0.58934V7.88469H4.56895L6.21522 4.04432Z"
      fill="#A1AAB2"/>
  </svg>
)

const UserIcon = () => (
  <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.22071 9.63155V13.8074H6.62718V9.63155C9.40214 9.97754 11.5498 12.3446 11.5498 15.2138H0.298065C0.298088 13.8435 0.798196 12.5203 1.70454 11.4925C2.61088 10.4647 3.86114 9.80299 5.22071 9.63155ZM5.92394 8.88471C3.59272 8.88471 1.70453 6.99653 1.70453 4.6653C1.70453 2.33408 3.59272 0.445892 5.92394 0.445892C8.25517 0.445892 10.1434 2.33408 10.1434 4.6653C10.1434 6.99653 8.25517 8.88471 5.92394 8.88471Z"
      fill="#A1AAB3"/>
  </svg>
)

const ListItem: FC<Issue> = ({title, state, html_url, user, labels, created_at, milestone}) => {
  const label = {inputProps: {'aria-label': 'Checkbox demo'}};
  const [userData,] = useRecoilState(userState)
  const created = timeAgo.format(Date.parse(created_at))
  const due = !!milestone && !!milestone.due_on ? timeAgo.format(Date.parse(milestone.due_on)) : ``
  // @ts-ignore
  const dueTitle = (due || '').split(" ")[0] !== 'in' ? 'Overdue' : 'Due'
  const [priority, setPriority] = useState('medium')
  const [stat, setStat] = useState(state)

  return (
    <Grid container sx={classes.root} alignItems={'center'}>
      <Grid item lg={6}>
        <Grid container alignItems={'center'} sx={{flexWrap: 'nowrap'}}>
          <Grid item>
            <Checkbox {...label} disabled/>
          </Grid>
          <Grid item>
            <Avatar sx={{...classes.avatar, ml: 1, mr: 2}}>
              <img src={user.avatar_url} alt={user.login[0]} style={classes.avatar}/>
            </Avatar>
          </Grid>
          <Grid item>
            {labels.length ? labels.map((l: Label) => <Chip variant={'outlined'} sx={{
              borderColor: `#${l.color}`,
              color: `#${l.color}`,
              backgroundColor: `#${l.color}1A`,
              ...classes.chip,
            }} label={l.name} key={l.id}/>) : <Fragment/>}
            <Link href={html_url} underline={'none'} target={'blank'}><Typography component={'h2'}
                                                                                  sx={classes.title}>{title}</Typography></Link>
            <Grid container alignItems={'center'}>
              {
                !!userData[user.login] && !!userData[user.login].name &&
                <>
                  <Typography sx={classes.foot} component={'span'}>By {userData[user.login].name}</Typography>
                  <Box sx={classes.dot}/>
                </>
              }
              {
                !!created &&
                <>
                  <Typography sx={classes.foot} component={'span'}>Created {created}</Typography>
                  {!!due.length && <Box sx={classes.dot}/>}
                </>
              }
              {
                !!due.length &&
                <Typography sx={classes.foot} component={'span'}>{dueTitle} {due}</Typography>
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid lg={6} item alignItems={'center'} container>
        <Select value={priority} onChange={(e: SelectChangeEvent) => setPriority(e.target.value as string)}
                sx={classes.prioritySelect}>
          <MenuItem value={'medium'}>
            <Box sx={classes.priorityBox}>
              <Box sx={{bgcolor: 'orange', ...classes.priorityColor,}}/>
              Medium
            </Box>
          </MenuItem>
          <MenuItem value={'high'}>
            <Box sx={classes.priorityBox}>
              <Box sx={{bgcolor: 'red', ...classes.priorityColor,}}/>
              High
            </Box>
          </MenuItem>
          <MenuItem value={'low'}>
            <Box sx={classes.priorityBox}>
              <Box sx={{bgcolor: 'blue', ...classes.priorityColor,}}/>
              Low
            </Box>
          </MenuItem>
        </Select>
        <Select value={stat} onChange={(e: SelectChangeEvent) => setStat(e.target.value as string)}
                sx={classes.prioritySelect}>
          <MenuItem value={'open'}>
            <Box sx={classes.priorityBox}>
              <Box sx={{...classes.priorityColor, height: 'auto'}}>
                <OpenIcon/>
              </Box>
              Open
            </Box>
          </MenuItem>
          <MenuItem value={'closed'}>
            <Box sx={classes.priorityBox}>
              <Box sx={{...classes.priorityColor, height: 'auto'}}>
                <OpenIcon/>
              </Box>
              Closed
            </Box>
          </MenuItem>
        </Select>
        {
          !!userData && !!userData[user.login] && !!userData[user.login].name &&
          <Box sx={classes.userBox}>
            <UserIcon/>
            {userData[user.login].name}
          </Box>
        }
      </Grid>
    </Grid>
  );
};

export default ListItem;