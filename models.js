// models.js
const mongoose = require('./db'); // Use the centralized connection

// Define the Food schema
const FoodSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  fprice: { type: Number, required: true },
  imageUrl: { type: String, required: true }
});

// Create a text index for searching
FoodSchema.index({ fname: 'text' });

// Declare the Food model
const Food = mongoose.model('Food', FoodSchema);

module.exports = Food;
