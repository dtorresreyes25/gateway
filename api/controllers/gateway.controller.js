Gateway = require("../models/gateway.model");
Device = require("../models/device.model");

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
        success: false,
        message: "Gateway not found"
      });
    }
    res.json({
      message: "Gateway details loading..",
      data: gateway
    });
  });
};

exports.update = function (req, res) {
  Gateway.findByIdAndUpdate(
    req.params.gateway_id,
    req.body,
    { new: true },
    function (err, gateway) {
      if (err) {
        res.status(400).json({
          status: "error",
          error: err
        });
      }
      if (!gateway) {
        return res.status(400).json({
          success: false,
          error: "Gateway not found!"
        });
      }

      gateway.save(function (err) {
        if (err) res.json(err);
        res.json({
          message: "Gateway Info updated",
          data: gateway
        });
      });
    }
  );
};

exports.delete = function (req, res) {
  Gateway.remove(
    {
      _id: req.params.gateway_id
    },
    function (err, state) {
      if (!state) {
        return res.status(400).json({
          success: false,
          error: "Gateway not found!"
        });
      }
      res.json({
        status: "success",
        message: "Gateway deleted"
      });
    }
  );
};
