const express = require('express');
const router = express.Router();

const checkAuth = require("../middlewares/check-auth");
const societyController = require('../controllers/society');

router.get('/fetch_societies', societyController.fetchSocieties);
router.post('/add_society', checkAuth, societyController.addSociety);
router.get('/get_society/:society_id', societyController.getSociety);
router.post('/add_event', societyController.addEvent);
router.post('/add_notice', societyController.addNotice);
router.delete('/delete_society_event', societyController.deleteSocietyEvent);
router.delete('/delete_society_notice', societyController.deleteSocietyNotice);

module.exports = router;