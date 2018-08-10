import React from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import { Meteor } from 'meteor/meteor';
import { Konfiguration as Config } from '../../../common/collections';
import Switch from '@material-ui/core/Switch';
import { withTracker } from 'meteor/react-meteor-data';
import Button from '@material-ui/core/Button';

class Konfiguration extends React.Component {
    toggleRegOpen = (e, c) => {
        Meteor.call('toggleRegister');
    }
    insertFakes = (e) => {
        Meteor.call('createFakeUsers', 10);
    }

    render() {
        return(
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <Typography variant="title">
                        Konfiguration
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    Registrierung möglich:
                </Grid>
                <Grid item xs={2}>
                    <Switch checked={this.props.regOpen} 
                            onChange={this.toggleRegOpen}
                            disabled={this.props.notReady}
                    />
                </Grid>
                <Grid item xs={6} />
                <Grid item xs={4}>
                    <Button fullWidth
                            onClick={this.insertFakes}
                            variant="outlined">
                        Fake User einfügen
                    </Button>
                </Grid>
                <Grid item xs={8} />
            </Grid>
        )
    }
}


export default KonfigurationContainer = withTracker(() => {
    const configHandle = Meteor.subscribe('konfiguration');
    const regOpen = Config.findOne({key: 'registrationOpen'});
    return {
        regOpen: regOpen && !!regOpen.value,
        notReady: !configHandle.ready()
    }
})(Konfiguration);