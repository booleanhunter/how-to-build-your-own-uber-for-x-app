const mongoose = require('mongoose');

/**
 * Represents a Cop's Schema.
 * @constructor
 */
const copSchema = mongoose.Schema({
	userId: { type: String, unique: true, required: true, trim: true },
	displayName: { type: String, trim: true },
	phone: { type: String },
	email: { type: String, unique: true },
	earnedRatings: { type: Number },
	totalRatings: { type: Number },
	location: {
		type: {
			type: String,
			required: true,
			default: "Point"
		},
		address: { type: String },
		coordinates: [ Number ],
	}
});

copSchema.index({"location": "2dsphere", userId: 1});

/**
 * Represents a Cop.
 * @constructor
 */
const Cop = mongoose.model('Cop', copSchema);

/**
 * Represents a request Schema.
 * @constructor
 */
const requestSchema = mongoose.Schema({
	requestTime: { type: Date },
	location: {
		coordinates: [ Number ],
		adress: { type: String }
	},
	civilianId: { type: String },
	copId: { type: String },
	status: { type: String }
});

/**
 * Represents a Request.
 * @constructor
 */
const Request = mongoose.model('Request', requestSchema);

exports.Cop = Cop;
exports.Request = Request;