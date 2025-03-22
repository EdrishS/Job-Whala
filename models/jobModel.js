// models/jobModel.js
exports.createJob = async (title, company, description, employerId) => {
    return db.execute("INSERT INTO jobs (title, company, description, employer_id) VALUES (?, ?, ?, ?)", [title, company, description, employerId]);
  };
  exports.getJobs = async () => {
    const [jobs] = await db.execute("SELECT * FROM jobs");
    return jobs;
  };