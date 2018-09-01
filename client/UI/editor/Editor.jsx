import React from 'react';
import EditField from './EditField';
import Preview from './Preview';
import Grid from '@material-ui/core/Grid';

class Editor extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        content: this.props.content ? this.props.content : ''
    }
    setContent = (event) => {
        this.setState({
            content: event.target.value
        });
        this.props.change(event.target.value);
    }
    static getDerivedStateFromProps(props, state) {
        if(props.content != state.content) {
            return {
                content: props.content
            }
        }
        return null;
    }
    render() {
        return(
            <Grid container spacing={8}>
                <Grid item xs={12} xl={6}>
                    <EditField setter={this.setContent} callbackString={this.props.callbackString} content={this.state.content}/>
                </Grid>
                <Grid item xs={12} xl={6}>
                    <Preview data={this.state.content}/>
                </Grid>
            </Grid>
        )
    }
}

export default Editor;