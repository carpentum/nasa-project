const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = `mongodb+srv://ramonmosquera:${process.env.MONGO_PASSWORD}@nasacluster.taslrwu.mongodb.net/nasa-project`;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.once("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
