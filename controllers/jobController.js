// controllers/jobController.js
exports.postJob = async (req, res) => {
    const { title, company, description } = req.body;
    await db.execute("INSERT INTO jobs (title, company, description, employer_id) VALUES (?, ?, ?, ?)", [title, company, description, req.user.id]);
    res.json({ message: "Job posted successfully" });
  };
  exports.applyJob = async (req, res) => {
    const { jobId } = req.body;
    await db.execute("INSERT INTO applications (job_id, applicant_id) VALUES (?, ?)", [jobId, req.user.id]);
    res.json({ message: "Application submitted" });
  };
  exports.rejectApplication = async (req, res) => {
    const { applicationId } = req.body;
    await db.execute("DELETE FROM applications WHERE id = ?", [applicationId]);
    res.json({ message: "Application rejected" });
  };
  exports.scheduleInterview = async (req, res) => {
    const { applicationId, date } = req.body;
    await db.execute("UPDATE applications SET interview_date = ? WHERE id = ?", [date, applicationId]);
    res.json({ message: "Interview scheduled" });
  };