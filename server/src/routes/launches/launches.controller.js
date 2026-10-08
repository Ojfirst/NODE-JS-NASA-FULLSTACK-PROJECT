import {
	existsLaunchWithId,
	getAllLaunches,
	deleteLaunchById,
	scheduleNewLaunch,
} from '../../models/launches.model.js';
import AppError from '../../services/appError.js';
import getPagination from '../../config/query.js';

async function httpGetAllLaunches(req, res) {
	const query = req.query;
	const { skip, pageLimit } = getPagination(req.query);

	const launches = await getAllLaunches(skip, pageLimit);
	return res.status(200).json(launches);
}

async function httpSubmitNewLaunches(req, res) {
	try {
		const launch = req.body;

		if (
			!launch.mission ||
			!launch.rocket ||
			!launch.launchDate ||
			!launch.target
		) {
			throw new Error('Missing launch property');
		}
		launch.launchDate = new Date(launch.launchDate);

		if (isNaN(launch.launchDate)) {
			throw new Error('Invalid date');
		}

		await scheduleNewLaunch(launch);
		return res.status(201).json(launch);
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
}

async function httpDeleteLaunch(req, res) {
	try {
		const launchId = +req.params.id;
		const exists = await existsLaunchWithId(launchId);
		if (!exists) {
			// return res.status(404).json({ error: 'Launch not found' });
			throw new AppError('Launch not found', 404);
		}

		const aborted = await deleteLaunchById(launchId);
		if (!aborted) {
			// return res.status(400).json({ error: 'Launch not aborted' });
			throw new AppError('Launch not aborted', 400);
		}

		return res.status(200).json({ ok: true });
	} catch (err) {
		return res.status(err.statusCode).json({ error: err.message });
	}
}

export { httpGetAllLaunches, httpSubmitNewLaunches, httpDeleteLaunch };
