import React from 'react';
import EditField from './EditField';
import Preview from './Preview';
import Grid from '@material-ui/core/Grid';

class Editor extends React.Component {
    state = {
        content: ''
    }
    setContent = (event) => {
        this.setState({
            content: event.target.value
        });
        this.props.change(event.target.value);
    }
    render() {
        return(
            <Grid container spacing={8}>
                <Grid item xs={12} xl={6}>
                    <EditField setter={this.setContent} callbackString={this.props.callbackString}/>
                </Grid>
                <Grid item xs={12} xl={6}>
                    <Preview data={this.state.content}/>
                </Grid>
            </Grid>
        )
    }
}

export default Editor;