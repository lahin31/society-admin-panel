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