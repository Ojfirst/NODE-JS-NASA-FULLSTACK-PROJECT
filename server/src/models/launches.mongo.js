import mongoose, { Types } from 'mongoose';

const launchesSchema = new mongoose.Schema(
	{
		flightNumber: {
			type: Number,
			required: true,
		},
		mission: {
			type: String,
			required: true,
			trim: true,
		},
		rocket: {
			type: String,
			required: true,
			trim: true,
		},
		launchDate: {
			type: Date,
			required: true,
		},
		target: {
			type: String,
			required: true,
		},
		destination: {
			type: String,
			required: true,
			trim: true,
		},
		customers: {
			type: [String],
			default: [],
		},
		upcoming: {
			type: Boolean,
			required: true,
		},
		success: {
			type: Boolean,
			required: true,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

const launchDB = mongoose.model('Launch', launchesSchema);

export default launchDB;
