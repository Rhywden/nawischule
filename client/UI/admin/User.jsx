import React from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import { Meteor } from 'meteor/meteor';
import { Konfiguration as Config } from '../../../common/collections';
import Switch from '@material-ui/core/Switch';
import { withTracker } from 'meteor/react-meteor-data';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

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

class User extends React.Component {
    render() {
        const { users, classes } = this.props;
        return(
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Vorname</TableCell>
                                    <TableCell>Nachname</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>E-Mail</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map(user => {
                                    return(
                                        <TableRow key={user._id}>
                                            <TableCell>{(user.profile && user.profile.firstname) ? user.profile.firstname : '---'}</TableCell>
                                            <TableCell>{(user.profile && user.profile.lastname) ? user.profile.lastname : '---'}</TableCell>
                                            <TableCell>{user.username}</TableCell>
                                            <TableCell>{user.emails[0].address}</TableCell>
                                        </TableRow>
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
    const allUsers = Meteor.users.find({}).fetch();
    return {
        usersReady: allUserHandle.ready(),
        users: allUsers
    }
})(User));