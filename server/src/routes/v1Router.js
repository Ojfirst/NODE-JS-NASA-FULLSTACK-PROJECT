import { Router } from 'express';

import planetsRouter from './planets/planets.route.js';
import launchesRouter from './launches/launches.route.js';

const v1Router = Router();

v1Router.use('/planets', planetsRouter);
v1Router.use('/launches', launchesRouter);

export default v1Router;
