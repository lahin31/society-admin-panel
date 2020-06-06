const express = require('express');
const router = express.Router();

const societyController = require('../controllers/society');

router.get('/fetch_societies', societyController.fetchSocieties);

module.exports = router;