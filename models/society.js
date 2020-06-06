const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const societySchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	members: [
		{
      type: Schema.Types.ObjectId,
      ref: "Student",
    }
	],
	events: [
		{
			title: String,
			picture: String,
			registered_members: [],
			date: String,
			time: String
		}
	],
	notice: [
		{
			status: Boolean,
			title: String,
			description: String
		}
	]
});

module.exports = mongoose.model("Society", societySchema);