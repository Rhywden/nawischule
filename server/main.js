import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import '../common/methods';
import './publications';

Meteor.startup(() => {
    if(Meteor.isDevelopment) {
      const admin = Meteor.users.findOne({username: "admin"});
      if(!admin) {
        const id = Accounts.createUser({username: "admin", email: "jon@a.com", "password": "1234"});
        Roles.addUsersToRoles(id, "admin", Roles.GLOBAL_GROUP);
      }
    } else {
      const admin = Meteor.users.findOne({username: "admin"});
      if(!admin) {
        const id = Accounts.createUser({username: "admin", email: Meteor.settings.server.user, password: Meteor.settings.server.password});
        Roles.addUsersToRoles(id, 'admin', Roles.GLOBAL_GROUP);
      }
    }
});

Meteor.methods({

});

Accounts.onCreateUser((options,user) => {
  user.createdAt = Date.now();
  if(options.profile)
      user.profile = options.profile;
  return user;
});

Meteor.users.deny({update: function () { return true; }});