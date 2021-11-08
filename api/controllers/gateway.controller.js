Gateway = require("../models/gateway.model");
Device = require("../models/device.model");
util = require("../utils");

exports.index = function (req, res) {
  Gateway.get(function (err, gateways) {
    if (err) {
      res.status(400).json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Gateways retrieved successfully",
      data: gateways
    });
  });
};

exports.new = function (req, res) {
  if (req.body.devices.length >= 11) {
    res.status(400).json({
      status: "error",
      message: "only 10 peripheral devices are allowed per gateway"
    });
    return;
  }

  Gateway.find({ serial: req.body.serial.trim() }, function (err, gateways) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    if (gateways && gateways.length > 0) {
      res.status(400).send({
        status: "error",
        message: req.body.serial + " is already exist"
      });
    } else {
      const gateway = new Gateway();
      const gatewayObj = req.body;
      Object.keys(gatewayObj).forEach((key, index) => {
        gateway[key] = gatewayObj[key];
      });

      gateway.save(function (err) {
        if (err) {
          res.status(400).json({
            status: "error",
            error: err
          });
        }
        res.json({
          message: "New gateway created!",
          data: gateway
        });
      });
    }
  });
};

exports.view = function (req, res) {
  Gateway.findById(req.params.gateway_id, function (err, gateway) {
    if (err) {
      res.status(400).json({
        status: "error",
        error: err
      });
    }
    if (gateway == null) {
      return res.status(400).json({
        status: "error",
        message: "Gateway not found"
      });
    }
    res.json({
      status: "success",
      message: "Gateway details loaded",
      data: gateway
    });
  }).populate("devices");
};

exports.update = function (req, res) {
  if (req.body.devices.length >= 11) {
    res.status(400).json({
      status: "error",
      message: "only 10 peripheral devices are allowed per gateway"
    });
    return;
  }

  Gateway.findByIdAndUpdate(
    req.params.gateway_id,
    req.body,
    { new: true },
    function (err, gateway) {
      if (err) {
        res.status(400).json({
          status: "error",
          message: err.reason.message
        });
      }
      if (!gateway) {
        return res.status(400).json({
          status: "error",
          message: "Gateway not found!"
        });
      }

      gateway.save(function (err) {
        if (err) res.json(err);
        res.json({
          status: "success",
          message: "Gateway Info updated",
          data: gateway
        });
      });
    }
  ).populate("devices");
};

exports.delete = function (req, res) {
  Gateway.remove(
    {
      _id: req.params.gateway_id
    },
    function (err, state) {
      if (!state) {
        return res.status(400).json({
          status: "error",
          message: "Gateway not found!"
        });
      }
      res.json({
        status: "success",
        message: "Gateway deleted"
      });
    }
  );
};

exports.addDevice = async function (req, res) {
  try {
    const getGateway = async () =>
      await Gateway.findById(req.params.gateway_id).populate("devices");
    const newDevice = await Device.create(req.body);
    const gateway = await getGateway();

    if (gateway && gateway.devices.length <= 10) {
      const gatewayUpdated = await gateway.update(
        { $push: { devices: newDevice._id } },
        { new: true, useFindAndModify: false }
      );
      if (gatewayUpdated) {
        res.json({
          status: "success",
          message: "New device created and gateway Info updated",
          data: await getGateway()
        });
        return;
      }
    }
    res.status(400).json({
      status: "error",
      message: "only 10 peripheral devices are allowed per gateway"
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err
    });
  }
};

exports.deleteDevice = async function (req, res) {
  try {
    const device = await Device.findOne({ _id: req.params.device_id });
    if (!device) {
      res.status(400).json({
        status: "error",
        message: "Device not found!"
      });
      return;
    }
    await device.remove();
    const gateways = await Gateway.findByIdAndUpdate(req.params.gateway_id, {
      $pull: { devices: device._id }
    }).populate("devices");
    if (!gateways) {
      res.status(400).json({
        status: "error",
        message: "Gateway not found!"
      });
      return;
    }
    res.json({
      status: "success",
      message: "Device deleted",
      data: gateways
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e
    });
  }
};
