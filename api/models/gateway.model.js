const mongoose = require("mongoose");
const deviceModel = require("./device.model");

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
    required: true,
    validate: {
      validator: function (v) {
        return v.match(
          "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$"
        );
      },
      message: (props) => `${props.value} is not a valid IP`
    }
  },
  devices: [deviceModel.deviceSchema]
});

let Gateway = (module.exports = mongoose.model(
  "Gateway",
  gatewaySchema,
  "gateway"
));

module.exports.get = function (callback, limit) {
  Gateway.find(callback).populate("devices").limit(limit);
};
