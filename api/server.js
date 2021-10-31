require("dotenv").config();
let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let expressJwt = require("express-jwt");

const environment = require("./config/environment");
let apiRoutes = require("./api-routes");

let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", apiRoutes);
app.use(
  expressJwt({
    secret: environment.secret,
    algorithms: ["HS256"],
    getToken: function (req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    }
  }).unless({
    path: ["/*.js", "/*.css"]
  })
);

const HOST = "0.0.0.0";
const server = app.listen(process.env.EXPRESS_PORT || 3000, HOST, () => {
  const PORT = server.address().port;
  console.log(`Running on http://${HOST}:${PORT}`);
});
