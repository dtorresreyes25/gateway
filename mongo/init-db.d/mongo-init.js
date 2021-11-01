print(
  "Start #################################################################"
);
db = new Mongo().getDB("admin");

db = db.getSiblingDB(_getEnv("MONGO_DB"));

db.createUser({
  user: _getEnv("MONGO_DB_USERNAME"),
  pwd: _getEnv("MONGO_DB_PASSWORD"),
  roles: [
    {
      role: "readWrite",
      db: _getEnv("MONGO_DB"),
    },
  ],
});

db.auth(_getEnv("MONGO_DB_USERNAME"), _getEnv("MONGO_DB_PASSWORD"));
db.devices.insertMany([
  {
    _id: "5895b74ca84c675de0d3338d",
    vendor: "AT&T",
    status: "online",
    create_date: Date.now(),
  },
  {
    _id: "5895b74da84c675de0d3338e",
    vendor: "Google Fi",
    status: "offline",
    create_date: Date.now(),
  },
  {
    _id: "5895b74da84c675de0d3338f",
    vendor: "Virgin Mobile",
    status: "online",
    create_date: Date.now(),
  },
]);
db.gateway.insert({
  serial: "00000000000000000000000000",
  human_readable_name: "cisco gateway",
  ipv4_address: "192.168.1.1",
  devices: [
    "5895b74ca84c675de0d3338d",
    "5895b74da84c675de0d3338e",
    "5895b74da84c675de0d3338f",
  ],
});
print("END #################################################################");
