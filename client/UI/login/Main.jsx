import React from "react";
import { Route, Switch, withRouter } from 'react-router-dom'
import Login from './Login';
import Register from './Register';

class Main extends React.Component {
    render() {
        return(
            <Switch>
                <Route exact path="/Login" component={Login} />
                <Route exact path="/Login/Register" component={Register} />
            </Switch>
        )
    }
}

export default withRouter(Main);