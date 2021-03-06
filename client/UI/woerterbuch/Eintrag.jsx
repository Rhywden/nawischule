import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Woerter } from '../../../common/collections';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Preview from '../editor/Preview';

class Eintrag extends React.Component {
    componentDidMount() {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"math"]);
    }
    componentDidUpdate() {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"math"]);
    }
    render() {
        return(
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <Link to="/Woerterbuch">Zurück zur Übersicht</Link>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="headline">
                        {this.props.wort.name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Preview data={this.props.wort.data} />
                </Grid>
            </Grid>
        )
    }
}

export default EintragContainer = withTracker((props) => {
    const eintragHandle = Meteor.subscribe('woerter', props.match.params.wort);
    const eintrag = Woerter.findOne({path: props.match.params.wort});
    return {
        wort: eintrag ? eintrag : {name: '', data: ''}
    }
})(Eintrag);