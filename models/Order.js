var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

// Create the Order schema, showing the shape of the order database entity.
var OrderSchema = new mongoose.Schema({
  id: { type: String, required: false },
  userId: { type: String, required: true },
  planId: { type: String, required: true },
  orderDate: { type: Date, default: Date.now, required: true },
  sendNotification: { type: Boolean, default: false, required: true },
  notificationSent: { type: Boolean, default: false, required: true },
  processed: { type: Boolean, default: false, required: true },
  dateProcessed: { type: Date, required: false }
});

OrderSchema.pre('save', function (next, err) {
   var order = this;

   var id = new ObjectId();
   order.id = id.toHexString();
   next();
});

// Export the module
var Order = mongoose.model('Order', OrderSchema);
module.exports = Order;