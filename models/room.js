const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomType: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  availableDates: [Date],
  amenities: [String],
});

module.exports = mongoose.model('Room', roomSchema);
