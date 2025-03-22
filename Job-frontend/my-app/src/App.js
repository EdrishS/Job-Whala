import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import JobList from "./components/JobList";
import JobPost from "./components/JobPost";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/post-job" element={<JobPost />} />
        </Routes>
      </Router>
    </AuthProvider>
  );  
}

export default App;
