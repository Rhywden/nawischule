import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import JsxParser from 'react-jsx-parser';

class Preview extends React.Component {
    componentDidMount() {
        if(!this.props.isEditor) MathJax.Hub.Queue(["Typeset",MathJax.Hub,"math"]);
    }
    componentDidUpdate() {
        if(!this.props.isEditor) MathJax.Hub.Queue(["Typeset",MathJax.Hub,"math"]);
    }
    insertJax() {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"math"]);
    }
    removeJax() {
        let jax = MathJax.Hub.getAllJax();
        for (let i = 0, m = jax.length; i < m; i++) {
            let tex = jax[i].originalText;
            let isDisplay = (jax[i].root.Get("display") === "block");
            if (isDisplay) tex = "$$"+tex+"$$"; else tex = "$"+tex+"$";
            let script = jax[i].SourceElement();
            jax[i].Remove();
            let preview = script.previousSibling;
            if (preview && preview.className === "MathJax_Preview") 
            preview.parentNode.removeChild(preview);
            script.parentNode.insertBefore(document.createTextNode(tex),script);
            script.parentNode.removeChild(script);
        }
    }
    render() {
        return(
            <>
                <JsxParser
                    components={{Grid, Typography}}
                    jsx={this.props.data}
                    id="math"
                />
                {this.props.isEditor ?
                    <><Button onClick={this.insertJax}>Mathify</Button><Button onClick={this.removeJax}>Unmathify</Button></>
                    : <></>
                }
            </>
        )
    }
}

export default Preview;

// <Typography variant="body1" id="math" dangerouslySetInnerHTML={{__html:this.props.data}} />