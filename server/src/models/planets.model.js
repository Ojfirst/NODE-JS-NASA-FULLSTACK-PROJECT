import { parse } from 'csv-parse';
import fs from 'node:fs';
import path from 'node:path';

import planetsDB from './planets.mongo.js';

const isHabitableplanet = (planet) => {
	return (
		planet['koi_disposition'] === 'CONFIRMED' &&
		planet['koi_insol'] > 0.36 &&
		planet['koi_insol'] < 1.11 &&
		planet['koi_prad'] < 1.6
	);
};

function loadPlanetsData() {
	return new Promise((resolve, reject) => {
		fs.createReadStream(path.join(process.cwd(), 'data', 'kepler_data.csv'))
			.pipe(
				parse({
					comment: '#',
					columns: true,
				})
			)
			.on('data', async (data) => {
				if (isHabitableplanet(data)) {
					await savePlanets(data);
				}
			})
			.on('error', (err) => {
				console.log(err);
				reject(err);
			})
			.on('end', async () => {
				console.log(
					`${(await getAllPlanets()).length} habitable planets found`
				);
			});
		resolve();
	});
}

async function savePlanets(planet) {
	try {
		await planetsDB.updateOne(
			{
				keplerName: planet.kepler_name,
			},
			{
				keplerName: planet.kepler_name,
			},
			{
				upsert: true,
			}
		);
	} catch (err) {
		console.error(`Failed to save planets:${err}`);
	}
}

async function getAllPlanets() {
	return await planetsDB.find({});
}

export { getAllPlanets, loadPlanetsData };
