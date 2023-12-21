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

const DEFAULT_FLIGHT_NUMBER = 100;

const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

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

saveLaunch(launch);

async function existsLaunchById(id) {
  return await launchesDatabase.findOne({ flightNumber: id });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launchesDatabase.find({}, { _id: 0, __v: 0 }).populate("target");
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error("No matching planet was found!");
  }
  launch.target = planet._id;
  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

async function scheduleNewLunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Zero to Mastery", "NASA"],
    flightNumber: newFlightNumber,
  });
  await saveLaunch(newLaunch);
}

async function abortLaunchById(id) {
  try {
    const aborted = await launchesDatabase.updateOne(
      { flightNumber: id },
      {
        upcoming: false,
        success: false,
      }
    );
    return aborted.modifiedCount === 1;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  existsLaunchById,
  getAllLaunches,
  scheduleNewLunch,
  abortLaunchById,
};
