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
		const society = await Society.findById({ _id: societyId });
		let events = [...society.events];
		events.push(newEvent);
		const updatedSociety = await Society.updateOne(
      { _id: societyId },
      {
        $set: {
          events,
        },
      }
		);
		return res.status(200).json({
			message: "Successfully added"
		})
	} catch(err) {
		return res.status(500).json({
			error: err
		})
	}
}

exports.deleteSocietyEvent = async (req, res) => {
	try {
		const event_id = req.body.event_id;
		const societyId = req.body.society_id;

		const society = await Society.findById({ _id: societyId });
		let events = [...society.events];
		let index = events.findIndex(ev => ev.id === event_id);
		events.splice(index, 1);
		const updatedSociety = await Society.updateOne(
      { _id: societyId },
      {
        $set: {
          events,
        },
      }
		);
		return res.status(200).json({
			message: "Deleted"
		})
	} catch(err) {
		return res.status(500).json({
			error: err
		})
	}
}

exports.addNotice = async (req, res) => {
	try {
		const newNotice = req.body.newNotice;
		const societyId = req.body.society_id;
		const society = await Society.findById({ _id: societyId });
		let notices = [...society.notices];
		notices.push(newNotice);
		const updatedSociety = await Society.updateOne(
      { _id: societyId },
      {
        $set: {
          notices,
        },
      }
		);
		return res.status(200).json({
			message: "Successfully added"
		})
	} catch(err) {
		return res.status(500).json({
			error: err
		})
	}
}

exports.deleteSocietyNotice = async (req, res) => {
	try {
		const notice_id = req.body.notice_id;
		const societyId = req.body.society_id;

		const society = await Society.findById({ _id: societyId });
		let notices = [...society.notices];
		let index = notices.findIndex(ev => ev.id === notice_id);
		notices.splice(index, 1);
		const updatedSociety = await Society.updateOne(
      { _id: societyId },
      {
        $set: {
          notices,
        },
      }
		);
		return res.status(200).json({
			message: "Deleted"
		})
	} catch(err) {
		return res.status(500).json({
			error: err
		})
	}
}