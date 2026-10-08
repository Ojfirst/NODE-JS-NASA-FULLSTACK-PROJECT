import request from 'supertest';
import { app } from '../../app';

describe('Planets API/GET', () => {
	test('Planets test should respon with 200 success', () => {
		const response = request(app)
			.get('/v1/planets')
			.expect('Content-type', '/json/')
			.expect(200);
	});
});
