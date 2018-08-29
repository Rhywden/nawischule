import React from "react";
import { Switch, Route } from 'react-router-dom';
import Eintrag from './Eintrag';
import Liste from './Liste';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Loadable from 'react-loadable';
import loading from '../Spinner';

const Neu = Loadable({loader: () => import('./Neu'), loading: loading});

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