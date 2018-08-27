import React from "react";
import Grid from '@material-ui/core/Grid';
import { Link, Route } from 'react-router-dom';
import Liste from './Liste';
import Anleitung from './Anleitung';

class Main extends React.Component {
    render() {
        return(
            <Grid container spacing={8}>
                <Grid item xs={12} md={2}>
                    <div>
                        <Link to="/Anleitungen/S1_Physik">S1 Physik</Link><br />
                        <Link to="/Anleitungen/S3_Physik">S3 Physik</Link>
                    </div>
                    <div>
                        <Route path="/Anleitungen/:kurs_id" component={Liste} />
                    </div>
                </Grid>
                <Grid item xs={12} md={10}>
                    <Route path="/Anleitungen/S3_Physik/Anleitung_1" component={Anleitung} />
                </Grid>
            </Grid>
        );
    }
}

export default Main;