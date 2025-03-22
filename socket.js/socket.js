// sockets/socket.js
function setupSockets(io) {
    io.on("connection", (socket) => {
      console.log("A user connected");
      socket.on("postJob", (data) => io.emit("jobPosted", data));
      socket.on("applyJob", (data) => io.emit("jobApplied", data));
      socket.on("rejectApplication", (data) => io.emit("applicationRejected", data));
      socket.on("scheduleInterview", (data) => io.emit("interviewScheduled", data));
      socket.on("disconnect", () => console.log("User disconnected"));
    });
  }
  module.exports = { setupSockets };