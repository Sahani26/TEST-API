// models/Service.js
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model('Service', ServiceSchema); // Export the Service model
