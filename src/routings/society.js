const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/check-auth");
const societyController = require("../controllers/society");

router.get("/fetch_societies", societyController.fetchSocieties);
router.get("/get_society/:society_id", societyController.fetchSociety);
router.post("/add_event", checkAuth, societyController.addEvent);
router.post("/add_notice", checkAuth, societyController.addNotice);
router.post(
  "/fetch_society_for_edit",
  checkAuth,
  societyController.fetchSocietyForEdit
);
router.post("/fetch_edit_event", checkAuth, societyController.fetchEditEvent);
router.post("/fetch_edit_notice", checkAuth, societyController.fetchEditNotice);
router.post("/add_society", checkAuth, societyController.addSociety);
router.post("/update_event", checkAuth, societyController.updateEvent);
router.post("/update_notice", checkAuth, societyController.updateNotice);
router.put("/update_society", checkAuth, societyController.updateSociety);
router.delete("/delete_society", checkAuth, societyController.deleteSociety);
router.delete(
  "/delete_society_event",
  checkAuth,
  societyController.deleteSocietyEvent
);
router.delete(
  "/delete_society_notice",
  checkAuth,
  societyController.deleteSocietyNotice
);

module.exports = router;
