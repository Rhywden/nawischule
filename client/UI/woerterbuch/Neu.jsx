import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Meteor } from 'meteor/meteor';
import Typography from "@material-ui/core/Typography";

class Neu extends React.Component {
    state = {
        name: '',
        path: '',
        data: '',
        error: ''
    }
    onChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        Meteor.call('neuesWort', this.state.name, this.state.path,this.state.data, (err) => {
            if(err) {
                this.setState({error: err.message});
            } else {
                this.props.history.push("/Woerterbuch/" + this.state.path);
            }
        });
    }
    render() {
        return(
            <form noValidate autoComplete="off">
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <TextField fullWidth
                            onChange={this.onChange('name')}
                            autoFocus
                            required={true}
                            placeholder="Name"
                            margin="normal"
                        />
                        <TextField fullWidth
                            onChange={this.onChange('path')}
                            required={true}
                            placeholder="Pfad"
                            margin="normal"
                        />
                        <TextField fullWidth
                            onChange={this.onChange('data')}
                            required={true}
                            placeholder="Daten"
                            margin="normal"
                        />
                        <Typography
                            color="error"
                            variant="display1"
                            align="center"
                        >
                            {this.state.error}
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
                    </Grid>
                </Grid>
            </form>
        )
    }
}

export default Neu;