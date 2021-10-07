import React, {FC} from 'react';
import {Box, Container, Grid} from "@mui/material";
import wrapperStyles from "../../styles/wrapper";

interface iProps {
}

const AppWrapper: FC<iProps> = ({children}) => {
  return (
    <Box sx={wrapperStyles.root}>
      <Grid container>
        nav here
      </Grid>
      <Container fixed maxWidth={'xl'}>
        {children}
      </Container>
    </Box>
  );
};

export default AppWrapper;
