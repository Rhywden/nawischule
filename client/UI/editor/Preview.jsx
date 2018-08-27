import React from 'react';
import Typography from '@material-ui/core/Typography';
import JsxParser from 'react-jsx-parser';
import Grid from '@material-ui/core/Grid';

class Preview extends React.Component {
    componentDidMount() {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"math"]);
    }
    componentDidUpdate() {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"math"]);
    }
    render() {
        return(
            <JsxParser 
                onError={() => {}}
                components={{Typography, Grid}}
                jsx={this.props.data} id="math"/>
        )
    }
}

export default Preview;

//            <Typography variant="body1" id="math" dangerouslySetInnerHTML={{__html:this.props.data}} />
