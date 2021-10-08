import React, {useState, MouseEvent} from 'react';
import {Grid, Box, Typography, Button, Menu, MenuItem} from "@mui/material";
import classes from '../../styles/issues_filter';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FilterIcon from "../icons/filter";
import {useRecoilState} from "recoil";
import {filterState, loadNowState, sortByState} from "../../recoil/atoms";

const Filters = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [, setLoadNow] = useRecoilState(loadNowState)
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setLoadNow(true)
  }

  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl2(event.currentTarget);
  const handleClose2 = () => {
    setAnchorEl2(null);
    setLoadNow(true)
  }

  const [sortBy, setSortBy] = useRecoilState(sortByState)
  const [, setFilter] = useRecoilState(filterState)

  return (
    <Grid container sx={classes.root} justifyContent={"space-between"} alignItems={'center'}>
      <Typography component={'h1'} sx={classes.title}>
        All tickets <ArrowDropDownIcon sx={{color: '#707E8A'}} />
      </Typography>

      <Box>
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={classes.btn}
        >
          <FilterIcon />Sort by <Box component={'span'} sx={{textTransform: 'capitalize', ml: .5}}>{sortBy}</Box>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => {
            setSortBy('created')
            handleClose()
          }}>Created</MenuItem>
          <MenuItem onClick={() => {
            setSortBy('updated')
            handleClose()
          }}>Updated</MenuItem>
          <MenuItem onClick={() => {
            setSortBy('comments')
            handleClose()
          }}>Comments</MenuItem>
        </Menu>

        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open2 ? 'true' : undefined}
          onClick={handleClick2}
          sx={classes.btn}
        >
          <FilterIcon />Filter
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl2}
          open={open2}
          onClose={handleClose2}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => {
            setFilter('all')
            handleClose2()
          }}>All</MenuItem>
          <MenuItem onClick={() => {
            setFilter('open')
            handleClose2()
          }}>Open</MenuItem>
          <MenuItem onClick={() => {
            setFilter('closed')
            handleClose2()
          }}>Closed</MenuItem>
        </Menu>
      </Box>
    </Grid>
  );
};

export default Filters;