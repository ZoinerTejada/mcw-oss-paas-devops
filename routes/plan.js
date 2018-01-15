var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Plan = require('../models/Plan.js');

/* Get all Plans */
router.get('/', function(req, res, next) {
  Plan.find(function (err, plans) {
    if (err) return next(err);
    res.json(plans);
  });
});

/* Get single Plan by Id */
router.get('/:id', function(req, res, next) {
  Plan.findById(req.params.id, function (err, plan) {
    if (err) return next(err);
    res.json(plan);
  });
});

module.exports = router;