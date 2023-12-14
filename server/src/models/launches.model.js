// const mongoose = require("mongoose");

// const launchSchema = new mongoose.Schema({
//   number: String,
//   date: String,
//   missionName: String,
//   rocket: String,
//   destination: String,
//   customers: String,
// });

// const Launch = mongoose.model("Launch", launchSchema);

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function existsLaunchById(id) {
  return launches.has(id);
}

function getAllLaunches() {
  console.log(Array.from(launches.values()));
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ["Zero to Mastery", "NASA"],
      flightNumber: latestFlightNumber,
    })
  );
}

function abortLaunchById(id) {
  let aborted = launches.get(id);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  existsLaunchById,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};
