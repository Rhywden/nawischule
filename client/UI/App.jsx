import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import { BrowserRouter as Router } from "react-router-dom";
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import Main from "./Main";

const theme = createMuiTheme({
    palette: {
        primary: green
    }
});

const AccountContext = React.createContext('account');

const withAccount = withTracker((props) => {
    const user = Meteor.user();
    const userId = Meteor.userId();
    const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin', 'school');
    return {
        account: {
            user,
            userId,
            isLoggedIn: !!userId,
            isAdmin: !!isAdmin
        }
    }
});

function Provider (props) {
    return (
        <AccountContext.Provider value={props.account}>
            {props.children}
        </AccountContext.Provider>
    );
}

const AccountProvider = withAccount(Provider);

class App extends React.Component {
    render() {
        return(
            <Router>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <AccountProvider>
                        <Main />
                    </AccountProvider>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export const AccountConsumer = AccountContext.Consumer;
export default App;