import 'dotenv/config';
import { createServer } from 'node:http';

import { app } from './app.js';
import { mongoDbConnection } from './services/mongo.js';
import { loadPlanetsData } from './models/planets.model.js';

// const PORT = process.env.PORT || 8080;
const PORT = process.env.PORT || 5001;
console.log(PORT);

const server = createServer(app);

const loadserver = async () => {
	try {
		await mongoDbConnection();
		await loadPlanetsData();
		server.listen(PORT, () => {
			console.log(`Listening on port http://localhost:${PORT}`);
		});
		console.log(PORT);
	} catch (err) {
		console.error('MongoDB Connection failed', err);
		process.exit(1);
	}
};

loadserver();
