import React from "react";
import Grid from '@material-ui/core/Grid';
import { Link, Route } from 'react-router-dom';
import Liste from './Liste';

class Main extends React.Component {
    render() {
        return(
            <Grid container spacing={8}>
                <Grid item xs={12} md={2}>
                    <Link to="/Anschriebe/S1_Physik">S1 Physik</Link><br />
                    <Link to="/Anschriebe/S3_Physik">S3 Physik</Link>
                </Grid>
                <Grid item xs={12} md={10}>
                    <Route path="/Anschriebe/:id" component={Liste} />
                </Grid>
            </Grid>
        );
    }
}

export default Main;