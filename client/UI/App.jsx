import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./Main";

const theme = createMuiTheme({
    palette: {
        primary: green
    }
});

class App extends React.Component {
    render() {
        return(
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Main />
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;