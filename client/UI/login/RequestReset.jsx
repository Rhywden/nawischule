import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class RequestReset extends React.Component {
    state={
        email: ''
    }
    onChange = event => {
        this.setState({
            email: event.target.value
        });
    }
    onSubmit = event => {

    }
    render() {
        return(
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <Typography variant="caption">
                        Passwort zurücksetzen
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        onChange={this.onChange}
                        value={this.state.email}
                        fullWidth
                        placeholder="Email-Adresse"
                        autoFocus/>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={this.onSubmit} variant="raised">Absenden</Button>
                </Grid>
            </Grid>
        )
    }
}

export default RequestReset;