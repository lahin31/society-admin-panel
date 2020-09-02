const Student = require("../models/student");

exports.fetchStudents = async (req, res) => {
  try {
    let students = await Student.find({});

    return res.status(200).json({
      students,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};
