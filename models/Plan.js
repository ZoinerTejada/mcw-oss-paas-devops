var mongoose = require('mongoose');

// Create the Plan schema, showing the shape of the plan database entity.
var PlanSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true, trim: true },
    friendlyName: { type: String, required: true, trim: true },
    portionSize: { type: String, required: true, trim: true },
    mealsPerWeek: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String, required: false, trim: true }
  });

// Export the module
module.exports = mongoose.model('Plan', PlanSchema);