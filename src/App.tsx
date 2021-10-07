import React from 'react';
import './App.css';
import AppWrapper from "./components/wrapper";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./utils/theme";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import IssuesScreen from "./components/screens/issues";
import Page404 from "./components/screens/404";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
          <Switch>
            <Route exact path={[`/`, `/issues`]}><IssuesScreen /></Route>
            <Route><Page404/></Route>
          </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
