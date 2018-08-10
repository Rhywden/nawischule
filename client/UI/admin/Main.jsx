import React from "react";
import { NavLink, Link, Route, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import Gruppen from './Gruppen';
import User from './User';
import Konfiguration from './Konfiguration';

class Main extends React.Component {
    render() {
        return(
            <Grid container spacing={16}>
                <Grid item xs={2}>
                    <NavLink to="/Admin/User">User</NavLink>
                </Grid>
                <Grid item xs={2}>
                    <NavLink to="/Admin/Gruppen">Gruppen</NavLink>
                </Grid>
                <Grid item xs={2}>
                    <NavLink to="/Admin/Konfiguration">Konfiguration</NavLink>
                </Grid>
                <Grid item xs={6}>

                </Grid>
                <Grid item xs={12}>
                    <Route path="/Admin/User" component={User} />
                    <Route path="/Admin/Gruppen" component={Gruppen} />
                    <Route path="/Admin/Konfiguration" component={Konfiguration} />
                </Grid>
            </Grid>
        );
    }
}

export default Main;