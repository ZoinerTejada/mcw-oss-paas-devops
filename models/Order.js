var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the Order schema, showing the shape of the order database entity.
var orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    planId: { type: Schema.Types.ObjectId, required: true, ref: 'Plan' },
    dayToProcess: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now, required: true },
    notificationSent: { type: Boolean, default: false, required: true }
  });

  module.exports = mongoose.model('Order', orderSchema);