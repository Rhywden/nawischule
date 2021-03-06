import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { Accounts } from 'meteor/accounts-base';
import moment from 'moment';
import { each, find } from 'underscore';
import fs from 'fs';
import { Roles } from 'meteor/alanning:roles';
import { Konfiguration, Woerter, Bilder, Kurse } from '../common/collections';
import faker from 'faker/locale/de';
import { Random } from 'meteor/random';

const fileUpload = (files, id, callback, returnFunction) => {
    each(files, (file) => {
        let filereader = new FileReader();
        let name = file.name;
        filereader.onload = () => {
            if(filereader.readAsBinaryString) {
                callback.call({name: name, blob: filereader.result, id: id}, (err, res) => {
                    if(!err) {
                        returnFunction(res);
                    }
                });
            } else {
                let binary = "";
                let bytes = new Uint8Array(filereader.result);
                let length = bytes.byteLength;
                for(let i=0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                callback.call({name: name, blob: binary, id: id}, (err, res) => {
                    if(!err) {
                        returnFunction(res);
                    }
                });
            }
        }
        if(filereader.readAsBinaryString) {
            filereader.readAsBinaryString(file);
        } else {
            filereader.readAsArrayBuffer(file);
        }
    })
}

const saveAnschriebFile = new ValidatedMethod({
    name: "save.anschrieb.file",
    mixins: [LoggedInMixin],
    checkRoles: {
        roles: ['admin'],
        group: 'school',
        rolesError: {
            error: 'not-allowed',
            message: 'Only for admins'
        }
    },
    checkLoggedInError: {
        error: 'not-logged-in',
        message: 'Einloggen ist für diese Methode nötig'
    },
    validate: null,
    run(vals) {
        let kursAnschriebLink = getKursFuerAnschriebLink(vals.id);
        if(this.isSimulation) {
            let filename = vals.name.toLowerCase().replace(/ /g,'_').replace(/ä/gi,'ae').replace(/ö/gi,'oe').replace(/ü/gi,'ue').replace(/ß/gi,'ss').replace(/[^a-z0-9_.]/gi,'');
            kursAnschriebLink.add({name: vals.name, filename: filename, date: new Date()});
        } else {
            let encoding = "binary";
            let path = "";
            if(process.env.NODE_ENV === "production") {
                path = '/var/www/static/anschriebe';
            } else {
                path = process.env['METEOR_SHELL_DIR'] + '/../../../public/static/anschriebe';
            }
            let filename = vals.name.toLowerCase().replace(/ /g,'_').replace(/ä/gi,'ae').replace(/ö/gi,'oe').replace(/ü/gi,'ue').replace(/ß/gi,'ss').replace(/[^a-z0-9_.]/gi,'');
            fs.writeFile(path+"/"+filename, vals.blob, encoding, Meteor.bindEnvironment( err => {
                if(err) {
                    console.log("Error:"+err);
                } else {
                    kursAnschriebLink.add({name: vals.name, filename: filename, date: new Date()});
                }
            }));
        }
    }
});

const saveWoerterbuchImage = new ValidatedMethod({
    name: "save.woerterbuch.image",
    mixins: [LoggedInMixin],
    checkRoles: {
        roles: ['admin'],
        group: 'school',
        rolesError: {
            error: 'not-allowed',
            message: 'Only for admins'
        }
    },
    checkLoggedInError: {
        error: 'not-logged-in',
        message: 'Einloggen ist für diese Methode nötig'
    },
    validate: null,
    run(vals) {
        let returnValue = {
            filename: '',
            error: {}
        };
        if(this.isSimulation) {
            let filename = Random.id() + vals.name.toLowerCase().replace(/ /g,'_').replace(/ä/gi,'ae').replace(/ö/gi,'oe').replace(/ü/gi,'ue').replace(/ß/gi,'ss').replace(/[^a-z0-9_.]/gi,'');
            returnValue.filename = filename;
        } else {
            let encoding = "binary";
            path = '/var/www/static/woerterbuch';
            const filename = Random.id() + vals.name.toLowerCase().replace(/ /g,'_').replace(/ä/gi,'ae').replace(/ö/gi,'oe').replace(/ü/gi,'ue').replace(/ß/gi,'ss').replace(/[^a-z0-9_.]/gi,'');
            returnValue.filename = "/static/woerterbuch/" + filename;
            fs.writeFile(path+"/"+filename, vals.blob, encoding, Meteor.bindEnvironment( err => {
                if(err) {
                    return {
                        filename: '',
                        error: err
                    }
                } else {
                    Bilder.insert({collection: 'woerterbuch', filename: filename});
                }           
            }));
        }
        return returnValue;
    }
})

Meteor.methods({
    impersonate: (user_to_impersonate) => {
        if(Roles.userIsInRole(Meteor.userId(), 'admin', 'school')) {
            this.setUserId(user_to_impersonate);
        }
    },
    createNewUser: (firstname, lastname, username, email, password, passwordCheck) => {
        let regOpen = Konfiguration.findOne({key: 'registrationOpen'});
        if(regOpen.value && password == passwordCheck) {
            let id = Accounts.createUser({username: username, email: email, password: password, profile: {firstname: firstname, lastname: lastname}});
            if(!id) {
                throw new Meteor.Error("general-error-creating-user", "Bei der Usererstellung liegt ein Fehler vor");
            }
        } else if(password != passwordCheck) {
            throw new Meteor.Error("password-unequal", "Passwörter müssen übereinstimmen!");
        } else {
            throw new Meteor.Error("reg-not-open", "Erstellen neuer User momentan nicht erlaubt!");
        }
    },
    toggleRegister: () => {
        if(Roles.userIsInRole(Meteor.userId(), 'admin', 'school')) {
            let regOpen = Konfiguration.findOne({key: 'registrationOpen'});
            Konfiguration.update({key: 'registrationOpen'}, {$set:{value: !regOpen.value}});
        }
    },
    createFakeUsers: (n) => {
        if(Roles.userIsInRole(Meteor.userId(), 'admin', 'school') && Meteor.isDevelopment) {
            Konfiguration.update({key: 'registrationOpen'}, {$set:{value: true}});
            for (let i = 0; i < n; i++) {
                Accounts.createUser({username: faker.internet.userName(), email: faker.internet.email(), password: faker.internet.password(), profile: {firstname: faker.name.firstName(), lastname: faker.name.lastName()}});
            }
            Konfiguration.update({key: 'registrationOpen'}, {$set:{value: false}});
        }
    },
    neuesWort: (id, name, path, data) => {
        if(Roles.userIsInRole(Meteor.userId(), 'admin', 'school')) {
            if(name != "" && path != "" && data != '') {
                let wortPruefen = Woerter.findOne({$and: [{$or:[{name: name}, {path: path}]}, {_id: {$ne: id} }]});
                if(wortPruefen) {
                    throw new Meteor.Error("wort-existing", "Der Name / Pfad existiert schon!");
                } else {
                    Woerter.update({_id: id},{name: name, path: path, data: data});
                    Woerter.remove({path: ''});
                }
            } else {
                throw new Meteor.Error("name-path-data-empty", "Alle Einträge dürfen nicht leer sein!");
            }
        }
    },
    neuWoerterbuch: () => {
        let id = '';
        if(Roles.userIsInRole(Meteor.userId(), 'admin', 'school')) {
            id = Woerter.insert({name: '', path: '', data: ''});
            return id;
        }
    },
    getWort: (id) => {
        return Woerter.findOne({_id: id});
    },
    neuerKurs: (name) => {
        if(Roles.userIsInRole(Meteor.userId(), 'admin', 'school')) {
            let kursPruefen = Kurse.findOne({name: name});
            if(kursPruefen) {
                throw new Meteor.Error("kurs-existing", "Dieser Kurs existiert bereits!");
            } else {
                Kurse.insert({
                    name: name,
                    usercount: 0,
                    status: 'aktiv'
                });
            }
        }
    },
    addUserToKurs: (id, kurs_id) => {
        if(Roles.userIsInRole(Meteor.userId(), 'admin', 'school')) {
            let kurs = Kurse.findOne({_id: kurs_id});
            let res = find(kurs.users, (u) => { return u == id });
            if(!res) {
                Kurse.update({_id: kurs_id}, {$inc: { usercount: 1 }});
            }
            Kurse.update({_id: kurs_id}, {$addToSet : { users: id }})
            Meteor.users.update({_id: id}, {$addToSet: { kurse : { _id: kurs_id, name: kurs.name } }});          
        }
    },
    removeUserFromKurs: (id, kurs_id) => {
        if(Roles.userIsInRole(Meteor.userId(), 'admin', 'school')) {
            let kurs = Kurse.findOne({_id: kurs_id});
            if(kurs.usercount > 0) {
                Kurse.update({_id: kurs_id}, {$inc: { usercount: -1 }});
            }
            Kurse.update({_id: kurs_id}, {$pull: {users: id}});
            Meteor.users.update({_id: id}, {$pull: { kurse : { _id: kurs_id, name: kurs.name } }});          
        }
    }

})

const examplemethod = new ValidatedMethod({
    name: "foo",
    mixins: [LoggedInMixin],
    checkRoles: {
        roles: ['admin'],
        group: 'school',
        rolesError: {
            error: 'not-allowed',
            message: 'Only for admins'
        }
    },
    checkLoggedInError: {
        error: 'not-logged',
        message: 'Einloggen ist für diese Methode nötig'
    },
    validate: null,
    run(vals) {
        if(this.isSimulation) {
            Dokumente.update({_id: vals.id}, {$set: {date: vals.date}});
        } else {
            Dokumente.update({_id: vals.id}, {$set: {date: vals.date}});
        }
    }
});

export { fileUpload, saveAnschriebFile, saveWoerterbuchImage };