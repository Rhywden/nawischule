import React from 'react';
import Grid from '@material-ui/core/Grid'
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Kurse } from '../../../common/collections';
import { Random } from 'meteor/random'

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  }); 

const UserRow = (props) => {
    const { user } = props;
    addUserToKurs = () => {
        props.addUserToKurs(user._id);
    }
    removeUserFromKurs = () => {
        props.removeUserFromKurs(user._id);
    }
    return (
        <TableRow key={user._id}>
            <TableCell>{(user.profile && user.profile.firstname) ? user.profile.firstname : '---'}</TableCell>
            <TableCell>{(user.profile && user.profile.lastname) ? user.profile.lastname : '---'}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.emails[0].address}</TableCell>
            <TableCell>
                {user.kurse ? user.kurse.map(k => {
                    return (
                        <React.Fragment key={Random.id()}>
                            {k.name}<br />
                        </React.Fragment>
                    )
                }) : ''}
            </TableCell>
            <TableCell>
                <IconButton onClick={this.addUserToKurs}><AddIcon color="primary"/></IconButton>
                <IconButton onClick={this.removeUserFromKurs}><RemoveIcon /></IconButton>
                <IconButton><EditIcon /></IconButton>
                <IconButton><DeleteIcon color="secondary" /></IconButton>
            </TableCell>
        </TableRow>
    )
}

class User extends React.Component {
    state = {
        kursSelected: ''
    }
    handleChange = e => {
        this.setState({
            kursSelected: e.target.value
        })
    }
    addUserToKurs = id => {
        if(this.state.kursSelected) {
            Meteor.call("addUserToKurs", id, this.state.kursSelected);
        }
    }
    removeUserFromKurs = id => {
        if(this.state.kursSelected) {
            Meteor.call("removeUserFromKurs", id, this.state.kursSelected);
        }
    }
    render() {
        const { users, classes, kurse } = this.props;
        return(
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <Select
                        value={this.state.kursSelected}
                        onChange={this.handleChange}
                    >
                        <MenuItem value=''>---</MenuItem>
                        {kurse.map(k => {
                            return(
                                <MenuItem key={k._id} value={k._id}>{k.name}</MenuItem>
                            )
                        })}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Vorname</TableCell>
                                    <TableCell>Nachname</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>E-Mail</TableCell>
                                    <TableCell>Kurse</TableCell>
                                    <TableCell>Aktionen</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map(user => {
                                    return(
                                        <UserRow 
                                            user={user} 
                                            addUserToKurs={this.addUserToKurs} 
                                            removeUserFromKurs={this.removeUserFromKurs}
                                            key={user._id} 
                                        />
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default UserContainer = withStyles(styles)(withTracker(() => {
    const allUserHandle = Meteor.subscribe('userData');
    const allKurseHandle = Meteor.subscribe('kurse')
    const allUsers = Meteor.users.find({}).fetch();
    const allKurse = Kurse.find({}).fetch();
    return {
        usersReady: allUserHandle.ready(),
        users: allUsers,
        kurseReady: allKurseHandle.ready(),
        kurse: allKurse
    }
})(User));