import React, {FC} from 'react';
import {Box, Container} from "@mui/material";
import wrapperStyles from "../../styles/wrapper";
import Navigation from "../navigation";

interface iProps {
}

const AppWrapper: FC<iProps> = ({children}) => {
  return (
    <Box sx={wrapperStyles.root}>
      <Navigation />
      <Container fixed maxWidth={'xl'}>
        {children}
      </Container>
    </Box>
  );
};

export default AppWrapper;
