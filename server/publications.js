import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Anschriebe, Anleitungen, Kurse, Woerter } from '../common/collections';

Meteor.publish("userData", function() {
    if(Roles.userIsInRole(this.userId, 'admin', 'school')) {
        return Meteor.users.find({}, {fields: {username:1, emails:1, profile: 1}});
    }
});

Meteor.publish("anschriebe", function() {
    if(Roles.userIsInRole(this.userId, 'admin', 'school')) {
        return Anschriebe.find({});
    } else {
        return Anschriebe.find({users: {$in:[this.userId]}});
    }
});

Meteor.publish("anleitungen", function() {
    if(Roles.userIsInRole(this.userId, 'admin', 'school')) {
        return Anleitungen.find({});
    } else {
        return Anleitungen.find({active: true, users: {$in: [this.userId]}});
    }
});

Meteor.publish("woerter", function() {
    Woerter.find({});
});

Meteor.publish("kurse", function() {
    if(Roles.userIsInRole(this.userId, 'admin', 'school')) {
        return Kurse.find({});
    } else {
        return Kurse.find({ users: {$in: [this.userId]}});
    }
})