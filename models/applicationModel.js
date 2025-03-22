// models/applicationModel.js
exports.applyJob = async (jobId, applicantId) => {
  return db.execute(
    "INSERT INTO applications (job_id, applicant_id) VALUES (?, ?)",
    [jobId, applicantId]
  );
};
exports.rejectApplication = async (applicationId) => {
  return db.execute("DELETE FROM applications WHERE id = ?", [applicationId]);
};
exports.scheduleInterview = async (applicationId, date) => {
  return db.execute("UPDATE applications SET interview_date = ? WHERE id = ?", [
    date,
    applicationId,
  ]);
};
