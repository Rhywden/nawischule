import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link, Route } from 'react-router-dom';
import Anleitung from './Anleitung';

class Liste extends React.Component {
    render() {
        return(
            <Grid container spacing={8}>
                <Grid item xs={12} lg={2}>
                <Typography variant="body1">
                    <Link to="/Anleitungen/S3_Physik/Anleitung_1">Anleitung 1</Link>
                </Typography>
                </Grid>
                <Grid item xs={12} lg={10}>
                    <Route path="/Anleitungen/S3_Physik/Anleitung_1" component={Anleitung} />
                </Grid>
            </Grid>
        )
    }
}

export default Liste;