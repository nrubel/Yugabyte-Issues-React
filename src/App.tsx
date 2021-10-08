import React from 'react';
import './App.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./utils/theme";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import IssuesScreen from "./screens/issues";
import Page404 from "./screens/404";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
          <Switch>
            <Route exact path={`/`}><IssuesScreen /></Route>
            <Route><Page404/></Route>
          </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
