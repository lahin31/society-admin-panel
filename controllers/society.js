const Admin = require('../models/admin');
const Society = require('../models/society');

exports.fetchSocieties = async (req, res) => {
	try {
		const societies = await Society.find({});
		return res.status(200).json({
			societies
		})
	} catch(err) {
		return res.status(500).json({
			error: err
		})
	}
}

exports.addSociety = async (req, res) => {
	try {
		const name = req.body.name;
		const description = req.body.desc;
		const adminId = req.adminId;
		const admin = await Admin.findById({ _id: adminId });
		
		if(!name || !admin) {
			return res.status(500).json({
				error: "Something went wrong"
			})
		}

		const society = new Society({
			name,
			description
		})

		await society.save();

		return res.status(200).json({
			message: "Added Successfully"
		})
	} catch(err) {
		return res.status(500).json({
			error: err
		})
	}
}

exports.getSociety = async(req, res) => {
	try {
		const societyId = req.params.society_id;
		const society = await Society.findById({ _id: societyId })
		return res.status(200).json({
			societyId,
			society
		})
	} catch(err) {
		return res.status(500).json({
			error: err
		})
	}
}

exports.addEvent = async (req, res) => {
	try {
		const newEvent = req.body.newEvent;
		const societyId = req.body.society_id;
		return res.status(200).json({
			newEvent,
			societyId
		})
	} catch(err) {
		return res.status(500).json({
			error: err
		})
	}
}