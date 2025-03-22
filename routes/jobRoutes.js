// routes/jobRoutes.js
const express = require("express");
const { postJob, applyJob, rejectApplication, scheduleInterview } = require("../controllers/jobController");
const router = express.Router();
router.post("/post", postJob);
router.post("/apply", applyJob);
router.post("/reject", rejectApplication);
router.post("/schedule", scheduleInterview);
module.exports = router;