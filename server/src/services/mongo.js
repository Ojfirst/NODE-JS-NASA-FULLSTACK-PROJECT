import mongoose from 'mongoose';

const DB_API = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
	console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
	console.error(err);
});

async function mongoDbConnection() {
	await mongoose.connect(DB_API);
}

async function mongoDbDisconnection() {
	await mongoose.disconnect();
}

export { mongoDbConnection, mongoDbDisconnection };
