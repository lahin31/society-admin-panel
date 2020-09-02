const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

router.post("/login", adminController.postLogin);

module.exports = router;
