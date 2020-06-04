const express = require('express');
const router = express.Router();

const studentContainer = require('../controllers/student');

router.get("/fetch_students", studentContainer.fetchStudents);

module.exports = router;