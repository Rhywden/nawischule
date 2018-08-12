import React from 'react';
import Typography from '@material-ui/core/Typography';

class Preview extends React.Component {
    componentDidMount() {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"math"]);
    }
    componentDidUpdate() {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"math"]);
    }
    render() {
        return(
            <Typography variant="body1" id="math" dangerouslySetInnerHTML={{__html:this.props.data}} />
        )
    }
}

export default Preview;