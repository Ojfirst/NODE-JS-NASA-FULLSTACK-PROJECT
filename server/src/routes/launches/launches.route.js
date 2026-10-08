import { Router } from 'express';
import {
	httpGetAllLaunches,
	httpSubmitNewLaunches,
	httpDeleteLaunch,
} from './launches.controller.js';

const launchesRouter = Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpSubmitNewLaunches);
launchesRouter.delete('/:id', httpDeleteLaunch);

export default launchesRouter;
