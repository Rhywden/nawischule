import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Grid from '@material-ui/core/Grid'
import { Kurse } from '../../../common/collections';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

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

class Gruppen extends React.Component {
    state = {
        open: false,
        name: '',
        alert: ''
    }
    onChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    neuerKurs = (e) => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        Meteor.call('neuerKurs', this.state.name, (err, res) => {
            if(!err) {
                this.setState({
                    name: '',
                    error: ''
                })
                this.handleClose();
            } else {
                this.setState({
                    error: err.message
                })
            }
        })
    }
    render() {
        const { kurse, classes } = this.props;
        return(
            <>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Button onClick={this.neuerKurs}>Neuer Kurs</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Kurse</TableCell>
                                        <TableCell>Useranzahl</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Aktionen</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {kurse.map(kurs => {
                                        return(
                                            <TableRow key={kurs._id}>
                                                <TableCell>{kurs.name}</TableCell>
                                                <TableCell>{kurs.usercount}</TableCell>
                                                <TableCell>{kurs.status}</TableCell>
                                                <TableCell>
                                                    <Button size="small">Umbenennen</Button>
                                                    <Button size="small">Archivieren</Button>
                                                    <Button size="small">Löschen</Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <form>
                    <DialogTitle>Neuer Kurs</DialogTitle>
                    <DialogContent>
                        <TextField 
                            autoFocus
                            fullWidth
                            onChange={this.onChange}
                            value={this.state.name}
                            />
                        <DialogContentText>{this.state.alert}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" onClick={this.onSubmit}>Submit</Button>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </DialogActions>
                    </form>
                </Dialog>
            </>
        )
    }
}

export default withStyles(styles)(withTracker(() => {
    const KursSubscription = Meteor.subscribe('kurse');
    const allKurse = Kurse.find({}).fetch();
    return {
        kurseReady: KursSubscription.ready(),
        kurse: allKurse
    }
})(Gruppen));