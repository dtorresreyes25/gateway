let router = require("express").Router();

router.get("/", function (req, res) {
  res.json({
    status: 200,
    message: "Welcome to gateway API"
  });
});

const userController = require("./controllers/user.controller");
const gatewayController = require("./controllers/gateway.controller");

//USER ROUTE
router.route("/users").get(userController.index).post(userController.new);
router
  .route("/user/:user_id")
  .get(userController.view)
  .patch(userController.update)
  .put(userController.update)
  .delete(userController.delete);
router.route("/user/authenticate").post(userController.authenticate);
router
  .route("/user/changepassword/:user_id")
  .put(userController.changePassword);

//GATEWAY ROUTE
router
  .route("/gateways")
  .get(gatewayController.index)
  .post(gatewayController.new);
router
  .route("/gateway/:gateway_id")
  .get(gatewayController.view)
  .patch(gatewayController.update)
  .put(gatewayController.update)
  .delete(gatewayController.delete);
router.route("/gateways/:gateway_id/device").post(gatewayController.addDevice);
router
  .route("/gateways/:gateway_id/device/:device_id")
  .delete(gatewayController.deleteDevice);

module.exports = router;
