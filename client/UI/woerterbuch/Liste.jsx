import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Woerter } from '../../../common/collections';
import { Roles } from 'meteor/alanning:roles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

class Liste extends React.Component {
    render() {
        return(
            <Grid container spacing={8}>
                {this.props.isAdmin ? 
                    <Grid item xs={12}>
                        <Link to="/Woerterbuch/Neu">Neuer Eintrag</Link>
                    </Grid>
                : ''}
                {this.props.index.map(i => {
                    return (
                        <Grid item xs={2} key={i._id}>
                            <Link to={'/Woerterbuch/' + i.path}>{i.name}</Link>
                        </Grid>
                    )
                })}
            </Grid>
        )
    }
}

export default ListeContainer = withTracker(() => {
    const index = Woerter.find({}).fetch();
    return {
        index: index ? index : [],
        isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin', 'school')
    }
})(Liste);