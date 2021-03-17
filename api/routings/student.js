const express = require("express");
const router = express.Router();

const studentContainer = require("../controllers/student");
const checkAuth = require("../middlewares/check-auth");

router.get("/fetch_students", studentContainer.fetchStudents);

router.delete("/remove_student", checkAuth, studentContainer.removeStudent);

module.exports = router;
