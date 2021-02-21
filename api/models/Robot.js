const mongoose = require('mongoose');

const RobotSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  color: {
    type: String,
    require: true
  },
  attack: {
    type: Number,
    require: true,
  },
  defense: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Robot = mongoose.model('robot', RobotSchema);
