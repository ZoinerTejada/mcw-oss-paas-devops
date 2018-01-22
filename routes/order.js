var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = require('../models/Order.js');

/* Get single Order by id */
router.get('/:id', function (req, res, next) {
  Order.findById(req.params.id, function (err, order) {
    if (err) return next(err);
    res.json(order);
  });
});

/* Save Order */
router.post('/', function (req, res, next) {
  Order.create(req.body, function (err, order) {
    if (err) return next(err);
    res.json({
      "code": 200,
      "success": "Order processed successfully.",
      "order": order
    });
  });
});

module.exports = router;