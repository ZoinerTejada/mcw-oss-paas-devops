var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

var Order = require('../models/Order');
var Plan = require('../models/Plan');
var User = require('../models/User');

var databaseUrl = 'mongodb://localhost:27017/best-for-you-organics';

async.series([
    function (callback) {
        MongoClient.connect(databaseUrl, function (err, db) {

            if (err) throw err;
            db.dropDatabase(function (err, result) {
                db.close(true, function (err, result) {
                    console.log('database dropped...');
                    callback(null, 'SUCCESS - dropped database');
                });
            });
        });
    },
    function (callback) {
        mongoose.Promise = require('bluebird');
        mongoose.connect(databaseUrl, { useMongoClient: true, promiseLibrary: require('bluebird') })
            .then(() => {
                console.log('db connection succesful');
                callback(null, 'SUCCESS - Connected to MongoDB');
            });
    },
    function (callback) {
        console.log('Seeding plans...');

        var plans = [
            new Plan({
                name: 'two_person',
                friendlyName: 'Two Person Plan',
                portionSize: '1-2 Person',
                mealsPerWeek: '3 Unique meals per week',
                price: 72,
                description: 'Our basic plan, delivering 3 meals per week, which will feed 1-2 people.'
            }),
            new Plan({
                name: 'four_person',
                friendlyName: 'Four Person Plan',
                portionSize: '3-4 Person',
                mealsPerWeek: '3 Unique meals per week',
                price: 87,
                description: 'Our family plan, delivering 3 meals per week, which will feed 3-4 people.'
            }),
            new Plan({
                name: 'high_protein',
                friendlyName: 'High-Pro Plan',
                portionSize: '1-2 Person',
                mealsPerWeek: '3 High protein meals per week',
                price: 80,
                description: 'Specially formulated for athletes and active individuals, delivering 3 meals per week, for 1-2 people.'
            })
        ];

        async.eachSeries(plans,
            function (plan, planSavedCallback) {
                plan.save(function (err) {
                    if (err) console.dir(err);
                    planSavedCallback();
                });
            },
            function (err) {
                if (err) console.dir(err);
                console.log('Plans seeded.');
                callback(null, 'Success - Seed plans');
            }
        );
    },
    function (callback) {
        console.log('Seeding users...');

        var users = [
            new User({
                email: 'demouser@bfyo.com',
                password: 'Password.1!!',
                firstName: 'Demo',
                lastName: 'User',
                address1: '123 Main St',
                city: 'Carmel',
                state: 'IN',
                postalCode: '46033',
                phone: '3175551212'
            }),
            new User({
                email: 'john.smith@bfyo.com',
                password: 'Password.1!!',
                firstName: 'John',
                lastName: 'Smith',
                address1: '123 Main St',
                city: 'Virginia Beach',
                state: 'VA',
                postalCode: '23456',
                phone: '7575551212'
            })
        ];

        async.eachSeries(users,
            function (user, userSavedCallback) {
                user.save(function (err) {
                    if (err) console.dir(err);
                    userSavedCallback();
                });
            },
            function (err) {
                if (err) console.dir(err);
                console.log('Finished seeding users.');
                callback(null, 'SUCCESS - Seed Users');
            }
        );
    }
], function (err, results) {
    console.log('Database seeding complete');
    process.exit(0);
});


/*
var orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    planId: { type: Schema.Types.ObjectId, required: true, ref: 'Plan' },
    dayToProcess: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now, required: true },
    notificationSent: { type: Boolean, default: false, required: true }
  });
*/