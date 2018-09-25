import React from "react";
import { Route, Switch, withRouter } from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import RequestReset from './RequestReset';
import ResetPassword from './ResetPassword';


class Main extends React.Component {
    render() {
        return(
            <Switch>
                <Route exact path="/Login/Register" component={Register} />
                <Route exact path="/Login/RequestReset" component={RequestReset} />
                <Route exact path="/Login/ResetPassword/:token" component={ResetPassword} />
                <Route exact path="/Login" component={Login} />
            </Switch>
        )
    }
}

//export default withRouter(Main);
export default Main;