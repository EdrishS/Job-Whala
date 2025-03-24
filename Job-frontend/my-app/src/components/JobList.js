import { useEffect, useState } from "react";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5433/api/jobs")
      .then((res) => setJobs(res.data));
  }, []);

  const applyJob = async (jobId) => {
    await axios.post("http://localhost:5433/api/jobs/apply", { jobId });
    alert("Applied Successfully");
  };

  return (
    <div>
      <h2>Available Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {job.title} - {job.company}{" "}
            <button onClick={() => applyJob(job.id)}>Apply</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
