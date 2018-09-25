import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import { withRouter, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Konfiguration } from '../../../common/collections';

class RegistrationOpen extends React.Component {
    render() {
        const {regOpen} = this.props;
        return(
            <>
                {regOpen ?
                    <Typography variant="body1">
                        Hier zur <Link to="/Login/Register">Registrierung</Link>.
                    </Typography>
                : ''}
            </>
        )
    }
}

const RegistrationContainer = withTracker(() => {
    Meteor.subscribe('konfiguration');
    const regOpen = Konfiguration.findOne({key: 'registrationOpen'});
    return {
        regOpen: regOpen && !!regOpen.value,
    }
})(RegistrationOpen);

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        usernameError: false,
        passwordError: false,
        generalError: ''
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value 
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        let error = false;
        if(this.state.username == '') {
            error = true;
            this.setState({usernameError: true});
        } else {
            this.setState({usernameError: false});
        }
        if(this.state.password == '') {
            error = true;
            this.setState({passwordError: true});
        } else {
            this.setState({passwordError: false});
        }
        if(!error) {
            Meteor.loginWithPassword(this.state.username, this.state.password, (err) => {
                if(err) {
                    this.setState({generalError: err.message});
                } else {
                    this.props.history.push("/");
                }
            })
        }
    }
    render() {
        return(
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                    <form noValidate autoComplete="off">
                        <TextField
                            fullWidth
                            onChange={this.handleChange('username')}
                            autoFocus={true}
                            error={this.state.usernameError}
                            required={true}
                            placeholder="Username / E-Mail"
                            helperText={this.state.usernameError ? 'Darf nicht leer sein' : ' '}
                            margin="normal"
                        /><br />
                        <TextField
                            fullWidth
                            onChange={this.handleChange('password')}
                            error={this.state.passwordError}
                            required={true}
                            placeholder="Password"
                            type="password"
                            helperText={this.state.passwordError ? 'Darf nicht leer sein' : ' '}
                            margin="normal"
                        /><br />
                        <Typography
                            color="error"
                            variant="display1"
                            align="center"
                        >
                            {this.state.generalError}
                        </Typography>
                        <Button 
                            fullWidth
                            color="primary"
                            size="large"
                            variant="outlined"
                            onClick={this.onSubmit}
                            type="submit"
                        >
                            Absenden
                        </Button>
                    </form>
                    <RegistrationContainer />
                    <Typography variant="body1">
                        <Link to="/Login/RequestReset">Passwort vergessen?</Link>
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

//export default withRouter(Login);
export default Login;