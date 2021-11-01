let router = require("express").Router();

router.get("/", function (req, res) {
  res.json({
    status: 200,
    message: "Welcome to gateway API"
  });
});

const userController = require("./controllers/user.controller");
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

module.exports = router;
