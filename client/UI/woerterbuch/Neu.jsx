import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Meteor } from 'meteor/meteor';
import Typography from "@material-ui/core/Typography";
import Editor from '../editor/Editor';

async function getData(id, callback) {
    let wort = await Meteor.callPromise('getWort',id);
    callback(wort);
}

class Neu extends React.Component {
    constructor(props) {
        super(props);
        this.editorDataChange = this.editorDataChange.bind(this);
        this.state = {
            name: '',
            path: '',
            data: '',
            error: ''
        }
    }
    
    componentDidMount() {
        getData(this.props.match.params.id, (result) => {
            this.setState({
                name: result.name,
                path: result.path,
                data: result.data
            });
        })
    }
    onChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        Meteor.call('neuesWort', this.props.match.params.id, this.state.name, this.state.path,this.state.data, (err) => {
            if(err) {
                this.setState({error: err.message});
            } else {
                this.props.history.push("/Woerterbuch/" + this.state.path);
            }
        });
    }
    
    editorDataChange = (data) => {
        this.setState({
            data: data
        });
    }
    render() {
        return(
            <form noValidate autoComplete="off">

                <TextField fullWidth
                    onChange={this.onChange('name')}
                    autoFocus
                    required={true}
                    placeholder="Name"
                    margin="normal"
                    value={this.state.name}
                />
                <TextField fullWidth
                    onChange={this.onChange('path')}
                    required={true}
                    placeholder="Pfad"
                    margin="normal"
                    value={this.state.path}
                />
                <Editor change={this.editorDataChange} callbackString="woerterbuch" content={this.state.data}/>
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
                
            </form>
        )
    }
}

export default Neu;