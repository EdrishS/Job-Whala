import { useState } from "react";
import axios from "axios";

const JobPost = () => {
  const [job, setJob] = useState({ title: "", company: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/jobs/post", job);
    alert("Job Posted Successfully");
  };

  return (
    <div>
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Job Title" onChange={(e) => setJob({ ...job, title: e.target.value })} />
        <input type="text" placeholder="Company" onChange={(e) => setJob({ ...job, company: e.target.value })} />
        <textarea placeholder="Description" onChange={(e) => setJob({ ...job, description: e.target.value })} />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default JobPost;
