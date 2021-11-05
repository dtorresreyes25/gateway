require("dotenv").config();
let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let expressJwt = require("express-jwt");
let mongoose = require("mongoose");

const environment = require("./config/environment");
let apiRoutes = require("./api-routes");

let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(process.cwd() + "/public/"));

mongoose.connect(environment.mongodb.uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.Promise = global.Promise;

mongoose.connection.on("error", (error) => {
  console.log("Database error: ", error);
});
mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

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
    path: [
      "/api/user/authenticate",
      "/api/users",
      "/index.html",
      "/*.js",
      "/*.css"
    ]
  })
);

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

const HOST = "0.0.0.0";
const server = app.listen(process.env.EXPRESS_PORT || 3000, HOST, () => {
  const PORT = server.address().port;
  console.log(`Running on http://${HOST}:${PORT}`);
});
