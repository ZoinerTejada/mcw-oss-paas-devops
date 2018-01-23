var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var bcrypt = require('bcryptjs');

/* Get all Users */
router.get('/', function (req, res, next) {
    User.find(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

/* Get single User by id */
router.get('/:id', function (req, res, next) {
    User.findOne({ 'email': req.params.id }, function (err, user) {
        if (err) return next(err);
        res.json(user);
    });
});

/* Save User */
router.post('/', function (req, res, next) {
    User.create(req.body, function (err, user) {
        if (err) return next(err);
        req.session.user = {
            "id":user.email,
            "name":user.firstName
        };

        res.json({
            "code": 200,
            "success": "User registered in successfully.",
            "user": user
        });
    });
});

/* Update User */
router.put('/:id', function (req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
        if (err) return next(err);
        res.json(user);
    });
});

router.post('/login', function (req, res, next) {
    User.authenticate(req.body.email, req.body.password, function(err, user) {
        if(err) return next(err);
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.user = {
                    "id":user.email,
                    "name":user.firstName
                };

                res.json({
                    "code": 200,
                    "success": "User logged in successfully.",
                    "user":user
                });
            }
            else {
                res.json({
                    "code": 204,
                    "failure": "No email and password combination matching what was submitted was found. Please check your email address and password."
                });
            }
        } 
        else {
            res.json({
                "code": 204,
                "failure": "No account with that email address was found."
            });
        }
    });
});

router.post('/logout', function (req, res, next){
    if(req.session) {
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            }
            else {
                return res.json({
                    "code":200,
                    "success":"User successfully logged out."
                });
            }
        });
    }
});

module.exports = router;