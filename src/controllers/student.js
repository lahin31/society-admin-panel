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

exports.removeStudent = async (req, res) => {
  try {
    const studentId = req.body.student_id;

    if(!studentId) {
      return res.status(400).json({
        message: "Student id needed",
      });
    }

    await Student.deleteOne({ _id: studentId });
    let students = await Student.find({});
    
    return res.status(200).json({
      message: "Successfully deleted",
      students,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
}