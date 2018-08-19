import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link, Route } from 'react-router-dom';
import Uebung from './Uebung';

class Liste extends React.Component {
    render() {
        return(
            <Grid container spacing={8}>
                <Grid item xs={12} lg={2}>
                <Typography variant="body1">
                    <Link to="/Uebungen/S3_Physik/Uebung_1">Übung 1</Link>
                </Typography>
                </Grid>
                <Grid item xs={12} lg={10}>
                    <Route path="/Uebungen/S3_Physik/Uebung_1" component={Uebung} />
                </Grid>
            </Grid>
        )
    }
}

export default Liste;