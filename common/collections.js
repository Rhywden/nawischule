import { Mongo } from 'meteor/mongo';

export const Anschriebe = new Mongo.Collection('anschriebe');
export const Anleitungen = new Mongo.Collection('anleitungen');
export const Woerter = new Mongo.Collection('woerter');
export const Kurse = new Mongo.Collection('kurse');
export const Konfiguration = new Mongo.Collection('konfiguration');