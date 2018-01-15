var mongoose = require('mongoose');

// Create the Plan schema, showing the shape of the plan database entity.
var PlanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    portionSize: { type: String, required: true },
    mealsPerWeek: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false }
  });

// Export the module
module.exports = mongoose.model('Plan', PlanSchema);