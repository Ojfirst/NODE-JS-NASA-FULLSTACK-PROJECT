import launchDB from './launches.mongo.js';
import planetsDB from './planets.mongo.js';

// const launches = new Map();

let latestlightNumber = 100;

const DEFAULT_FLIGHT_NUMBER = 100;

async function existsLaunchWithId(launchId) {
	return await launchDB.findOne({ flightNumber: launchId });
}

const launch = {
	flightNumber: 100,
	mission: 'Heaven',
	rocket: 'Believer',
	launchDate: new Date('December 27, 2026'),
	target: 'Kepler-442 b',
	customers: ['Omojide', 'Abraham', 'Olorunfemi'],
	upcoming: true,
	success: true,
};

saveLaunch(launch);

// MongoDB ID
async function getLatestFlightNumber() {
	const latestLaunch = await launchDB.findOne().sort('-flightNumber');

	if (!latestLaunch) {
		return DEFAULT_FLIGHT_NUMBER;
	}

	return latestLaunch.flightNumber;
}

async function getAllLaunches(skip, pageLimit) {
	return await launchDB
		.find({}, { _id: 0, __v: 0 })
		.sort({ flightNumber: 1 })
		.skip(skip)
		.limit(pageLimit);
}

async function saveLaunch(launch) {
	try {
		return await launchDB.findOneAndUpdate(
			{
				flightNumber: launch.flightNumber,
			},
			launch,
			{
				upsert: true,
			}
		);
	} catch (err) {
		console.error(`Failed to save launch: ${err}`);
	}
}

async function scheduleNewLaunch(launch) {
	try {
		const planet = await planetsDB.findOne({
			keplerName: launch.target,
		});
		console.log(planet);

		// Check for referential intergrety
		if (!planet) {
			throw new Error(`${launch.target} does not exist`);
		}

		const newFlightNum = (await getLatestFlightNumber()) + 1;

		const newLaunch = Object.assign(launch, {
			success: true,
			upcoming: true,
			customers: ['Zero to Mastery', 'Omojide'],
			flightNumber: newFlightNum,
		});

		return await saveLaunch(newLaunch);
	} catch (err) {
		console.log(`${err}, Unable to schedule new launch!`);
	}
}

async function deleteLaunchById(launchId) {
	const aborted = await launchDB.updateOne(
		{
			flightNumber: launchId,
		},
		{
			success: false,
			upcoming: false,
		}
	);
	return aborted.acknowledged === true && aborted.modifiedCount === 1;
}

export {
	existsLaunchWithId,
	getAllLaunches,
	scheduleNewLaunch,
	deleteLaunchById,
};
