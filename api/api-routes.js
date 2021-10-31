let router = require("express").Router();

router.get("/", function (req, res) {
  res.json({
    status: 200,
    message: "Welcome to gateway API"
  });
  res.send();
});

module.exports = router;
