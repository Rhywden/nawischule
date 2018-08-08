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
    }
    handleChange = name => event => {

    }
    navigate = () => {
        this.props.history.push("/Login");
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
                        Hier zum <a href="#" onClick={this.navigate}>Login</a>.
                    </Typography>
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(Register);