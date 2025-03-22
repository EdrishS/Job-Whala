import { useState } from "react";
import axios from "axios";
import "./Register.css"; // Import CSS

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "jobseeker"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/auth/register", userData);
    alert("Registered Successfully");
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          onChange={(e) => setUserData({ ...userData, username: e.target.value })} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setUserData({ ...userData, email: e.target.value })} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setUserData({ ...userData, password: e.target.value })} 
        />
        <select onChange={(e) => setUserData({ ...userData, role: e.target.value })}>
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
