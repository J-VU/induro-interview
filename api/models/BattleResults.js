const mongoose = require('mongoose');

const BattleResultSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    ref: 'robot'
  },
  win: {
    type: Number,
    require: true
  },
  loss: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = BattleResult = mongoose.model('battleResult', BattleResultSchema);
