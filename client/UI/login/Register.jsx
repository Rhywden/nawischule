import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Register extends React.Component {
    state = {
        firstname: '',
        firstnameError: false,
        lastname: '',
        lastnameError: false,
        username: '',
        usernameError: false,
        password: '',
        passwordError: false,
        passwordCheck: '',
        passwordCheckError: false,
        email: '',
        emailError: false,
        generalError: ''
    }
    onSubmit = (evt) => {
        evt.preventDefault();
        let error = false;
        if(this.state.firstname == '') {
            error = true;
            this.setState({firstnameError: true});
        } else {
            this.setState({firstnameError: false});
        }
        if(this.state.lastname == '') {
            error = true;
            this.setState({lastnameError: true});
        } else {
            this.setState({lastnameError: false});
        }
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
        if(this.state.email == '') {
            error = true;
            this.setState({emailError: true});
        } else {
            this.setState({emailError: false});
        }
        if(this.state.password != this.state.passwordCheck) {
            error = true;
            this.setState({passwordCheckError: true});
        } else {
            this.setState({passwordCheckError: false});
        }
        if(!error) {
            Meteor.call('createNewUser', this.state.firstname, this.state.lastname, this.state.username, this.state.email, this.state.password, this.state.passwordCheck, (err) => {
                if(err) {
                    this.setState({generalError: err.message});
                } else {
                    this.props.history.push("/Login");
                }
            })
        }
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value 
        });
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
                            placeholder="Username"
                            helperText={this.state.usernameError ? 'Darf nicht leer sein' : ' '}
                            margin="normal"
                        /><br />
                        <TextField
                            fullWidth
                            onChange={this.handleChange('email')}
                            error={this.state.emailError}
                            required={true}
                            placeholder="E-Mail"
                            helperText={this.state.emailError ? 'Darf nicht leer sein' : ' '}
                            margin="normal"
                        /><br />
                        <TextField
                            fullWidth
                            onChange={this.handleChange('firstname')}
                            error={this.state.firstnameError}
                            required={true}
                            placeholder="Vorname"
                            helperText={this.state.firstnameError ? 'Darf nicht leer sein' : ' '}
                            margin="normal"
                        /><br />
                        <TextField
                            fullWidth
                            onChange={this.handleChange('lastname')}
                            error={this.state.lastnameError}
                            required={true}
                            placeholder="Nachname"
                            helperText={this.state.lastameError ? 'Darf nicht leer sein' : ' '}
                            margin="normal"
                        /><br />
                        <TextField
                            fullWidth
                            onChange={this.handleChange('password')}
                            error={this.state.passwordError}
                            required={true}
                            placeholder="Passwort"
                            helperText={this.state.passwordError ? 'Darf nicht leer sein' : ' '}
                            margin="normal"
                            type="password"
                        /><br />
                        <TextField
                            fullWidth
                            onChange={this.handleChange('passwordCheck')}
                            error={this.state.passwordCheckError}
                            required={true}
                            placeholder="Passwort wiederholen"
                            helperText={this.state.passwordCheckError ? 'Passwörter müssen übereinstimmen' : ' '}
                            margin="normal"
                            type="password"
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
                    <Typography>
                        Hier zum <Link to="/Login">Login</Link>.
                    </Typography>
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(Register);