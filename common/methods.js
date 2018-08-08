import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import moment from 'moment';
import { each } from 'underscore';
import fs from 'fs';
import { Roles } from 'meteor/alanning:roles';

const fileUpload = (files, id, callback, optional, optional2) => {
    each(files, (file) => {
        let filereader = new FileReader();
        let name = file.name;
        filereader.onload = () => {
            if(filereader.readAsBinaryString) {
                callback.call({name: name, blob: filereader.result, id: id, optional: optional, optional2: optional2});
            } else {
                let binary = "";
                let bytes = new Uint8Array(filereader.result);
                let length = bytes.byteLength;
                for(let i=0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                callback.call({name: name, blob: binary, id: id, optional: optional, optional2: optional2});
            }
        }
        if(filereader.readAsBinaryString) {
            filereader.readAsBinaryString(file);
        } else {
            filereader.readAsArrayBuffer(file);
        }
    })
}

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

Meteor.methods({
    impersonate: (user_to_impersonate) => {
        if(Roles.userIsInRole(Meteor.userId(), 'admin', 'school')) {
            this.setUserId(user_to_impersonate);
        }
    }
})

export { fileUpload, saveAnschriebFile };