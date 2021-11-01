const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema({
  vendor: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

let Device = (module.exports = mongoose.model("device", deviceSchema));

module.exports.get = function (callback, limit) {
  Device.find(callback).limit(limit);
};
