const mongoose = require("mongoose");

const gatewaySchema = mongoose.Schema({
  serial: {
    type: String,
    required: true
  },
  human_readable_name: {
    type: String,
    required: true
  },
  ipv4_address: {
    type: String,
    required: true
  },
  devices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device"
    }
  ]
});

let Gateway = (module.exports = mongoose.model(
  "Gateway",
  gatewaySchema,
  "gateway"
));

module.exports.get = function (callback, limit) {
  Gateway.find(callback).populate("devices").limit(limit);
};
