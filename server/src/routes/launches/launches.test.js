import request from 'supertest';
import { app } from '../../app.js';
import {
	mongoDbConnection,
	mongoDbDisconnection,
} from '../../services/mongo.js';
import { loadPlanetsData } from '../../models/planets.model.js';

describe('Launches API', () => {
	beforeAll(async () => {
		await mongoDbConnection();
		await loadPlanetsData();
	});

	afterAll(async () => {
		await mongoDbDisconnection();
	});

	describe('Test GET /launches', () => {
		test('It should respond with 200 success', async () => {
			const response = await request(app)
				.get('/v1/launches')
				.expect('Content-type', /json/)
				.expect(200);
		});
	});

	describe('Test POST /launch', () => {
		const launchData = {
			mission: 'Omojide',
			target: 'Kepler-442 b',
			rocket: 'faith',
			launchDate: 'January 8, 2080',
		};
		const launchDataWithoutDate = {
			mission: 'Omojide',
			target: 'Kepler-442 b',
			rocket: 'faith',
		};

		const launchDataWithInvalidDate = {
			mission: 'Omojide',
			target: 'Kepler-442 b',
			rocket: 'faith',
			launchDate: 'John',
		};

		test('It should respond with 201 success', async () => {
			const response = await request(app)
				.post('/v1/launches')
				.send(launchData)
				.expect(201)
				.expect('Content-type', /json/);

			const requestDate = new Date(launchData.launchDate).valueOf();
			const responseDate = new Date(response.body.launchDate).valueOf();
			expect(responseDate).toBe(requestDate);

			expect(response.body).toMatchObject(launchDataWithoutDate);
		});

		test('it should catch missing required properties', async () => {
			const response = await request(app)
				.post('/v1/launches')
				.send(launchDataWithoutDate)
				.expect(400)
				.expect('Content-type', /json/);

			expect(response.body).toStrictEqual({
				error: 'Missing launch property',
			});
		});

		test('it should catch invalid date', async () => {
			const response = await request(app)
				.post('/v1/launches')
				.send(launchDataWithInvalidDate)
				.expect(400)
				.expect('Content-type', /json/);

			expect(response.body).toStrictEqual({
				error: 'Invalid date',
			});
		});
	});
});
