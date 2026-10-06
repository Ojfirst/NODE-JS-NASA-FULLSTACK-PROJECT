import path from 'node:path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import loggerMiddleware from './middleware/logger.middleware.js';
import corsMiddleware from './middleware/cors.middleware.js';
import v1Router from './routes/v1Router.js';

const app = express();

// app.use(morgan('dev'));
app.use(loggerMiddleware); // http-loggeer
app.use(corsMiddleware); // set cross origin
app.use(express.json());

app.use(express.static(path.join(process.cwd(), 'public'))); // Client code
app.use('/v1', v1Router);
app.get(/.*/, (req, res) => {
	return res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

export { app };
