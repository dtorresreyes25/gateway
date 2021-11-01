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
      ref: "device"
    }
  ]
});

let Gateway = (module.exports = mongoose.model("gateway", gatewaySchema));

module.exports.get = function (callback, limit) {
  Gateway.find(callback).limit(limit);
};
