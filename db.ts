/// <reference path="typings/index.d.ts" />
// Mongo

import * as mongodb from 'mongodb';
//import mongodb = require('mongodb');

var server = new mongodb.Server('127.0.0.1', 27017);
var db = new mongodb.Db('testmach', server, { w: 1 });
var ObjectId = require('mongodb').ObjectID;

db.open(function() {});

export interface Rule {
    _id: string;
    ruleName: string;
}

export function getRules(callback: (rules: Rule[]) => void) {
    db.collection('rule', function(error, rules_collection) {
        if(error) { console.error(error); return; }
        rules_collection.find({}, { 'ruleName': 1 }).toArray(function(error, ruleobjs) {
           if(error) { console.error(error); return; }
           callback(ruleobjs);
        });
    });
}

export function addRule(ruleName: string, callback: (rules: Rule[]) => void){
	db.collection('rule', function(error, rules_collection) {
        if(error) { console.error(error); return; }
        rules_collection.insert({
			"ruleName" : ruleName
		}),(function(error, ruleobjs) {
           if(error) { console.error(error); return; }
           callback(ruleobjs);
        });
    });
}

export function deleteRule(id: string, callback: () => void){
    db.collection('rule', {}, function (error, rules_collection) {
        if (error) { console.error(error); return; }
        rules_collection.remove({ 
			_id: ObjectId(id)
			}),(function (err, result) {
				if (err) { console.log("Delete failed:" ,err); }				
				callback();
        });
    });
}


