const express = require('express');
const router = express.Router();

const checkAuth = require("../middlewares/check-auth");
const societyController = require('../controllers/society');

router.get('/fetch_societies', societyController.fetchSocieties);
router.post('/add_society', checkAuth, societyController.addSociety);

module.exports = router;