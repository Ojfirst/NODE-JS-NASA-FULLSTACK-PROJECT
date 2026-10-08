import mongoose from 'mongoose';

const planetSchema = new mongoose.Schema({
	keplerName: { type: String, required: true },
});

const planetsDB = mongoose.model('Planet', planetSchema);

export default planetsDB;
