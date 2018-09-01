import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Woerter } from '../../../common/collections';
import { Roles } from 'meteor/alanning:roles';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

const EditField = (props) => {
    const onClick = (e) => {
        props.history.push("/Woerterbuch/Neu/" + props._id)
    }
    return(
        <a href="javascript://" onClick={onClick}>(E)</a>
    )
}

class Liste extends React.Component {
    newEntry = () => {
        Meteor.call("neuWoerterbuch", (err, res) => {
            if(!err) this.props.history.push("/Woerterbuch/Neu/" + res);
        })
    }
    render() {
        return(
            <Grid container spacing={8}>
                {this.props.isAdmin ? 
                    <Grid item xs={12}>
                        <Button onClick={this.newEntry}>Neuer Eintrag</Button>
                    </Grid>
                : ''}
                {this.props.index.map(i => {
                    return (
                        <Grid item xs={2} key={i._id}>
                            <Link to={'/Woerterbuch/' + i.path}>{i.name}</Link> &nbsp;
                            <EditField history={this.props.history} _id={i._id}/>
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