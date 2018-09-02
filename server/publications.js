import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Anschriebe, Anleitungen, Kurse, Woerter, Konfiguration, Bilder } from '../common/collections';

Meteor.publish("userData", function() {
    if(Roles.userIsInRole(this.userId, 'admin', 'school')) {
        return Meteor.users.find({}, {fields: {username:1, emails:1, profile: 1, kurse: 1}});
    } else {
        return Meteor.users.find({_id: this.userId}, {fields: {username:1, emails:1, profile: 1, kurse: 1}});
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

Meteor.publish("woerter", function(path) {
    return Woerter.find({path: path},{fields: {name: 1, path: 1, data: 1}});
});

Meteor.publish("woerterIndex", function() {
    return Woerter.find({'name': {$ne:''} }, {fields: {name: 1, path: 1}})
})

Meteor.publish("kurse", function() {
    if(Roles.userIsInRole(this.userId, 'admin', 'school')) {
        return Kurse.find({});
    } else {
        return Kurse.find({ users: {$in: [this.userId]}});
    }
});

Meteor.publish("konfiguration", function() {
    return Konfiguration.find({});
});

Meteor.publish("bilder", function() {
    if(Roles.userIsInRole(this.userId, 'admin', 'school')) {
        return Bilder.find({});
    }
})