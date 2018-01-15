var mongoose = require('mongoose');

// Create the Order schema, showing the shape of the order database entity.
var orderSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    planId: { type: String, required: true },
    dayToProcess: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now, required: true },
    notificationSent: { type: Boolean, default: false, required: true }
  });

  module.exports = mongoose.model('Order', orderSchema);