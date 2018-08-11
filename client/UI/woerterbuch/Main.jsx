import React from "react";
import { Switch, Route } from 'react-router-dom';
import Eintrag from './Eintrag';
import Liste from './Liste';
import Neu from './Neu';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

class Main extends React.Component {
    render() {
        return(
            <Switch>
                <Route exact path="/Woerterbuch" component={Liste} />
                <Route exact path="/Woerterbuch/Neu" component={Neu} />
                <Route path="/Woerterbuch/:wort" component={Eintrag} />
            </Switch>
        );
    }
}

export default MainContainer = withTracker(() => {
    const listenHandle = Meteor.subscribe('woerterIndex');
    return {};
})(Main);