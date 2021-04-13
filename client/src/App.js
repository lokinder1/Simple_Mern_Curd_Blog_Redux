import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import React, { Fragment } from "react";
import Home from "./home";
import theme from "./theme/index";

const App = () => (
  <ThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={3}>
      <CssBaseline />
      <Fragment>
        <Home />
      </Fragment>
    </SnackbarProvider>
  </ThemeProvider>
);

export default App;
