import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        Meteor.logout();
    }

    render() {
        return(<Redirect to="/" />)
    }
}

export default Logout;