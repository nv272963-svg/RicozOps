const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

// Register Routes
app.use("/api/auth", authRoutes);
console.log("✅ Dashboard Routes Registered");
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/notifications", notificationRoutes);
console.log("✅ Settings Routes Registered");
app.use("/api/settings", (req, res, next) => {
    console.log("Settings Route Hit:", req.method, req.originalUrl);
    next();
});

app.use("/api/settings", settingsRoutes);

console.log("✅ Notification Routes Registered");
// Temporary Debug
app.use("/api/employees", (req, res, next) => {
    console.log("Employee Route Hit:", req.method, req.originalUrl);
    next();
});

app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
    res.send("🚀 Welcome to RicozOps Backend");
});

app.get("/test", (req, res) => {
    res.send("APP TEST OK");
});

const PORT = process.env.PORT || 5000;
db.getConnection()
    .then(connection => {
        console.log("✅ MySQL Connected Successfully");
        connection.release();
    })
    .catch(err => {
        console.log("❌ MySQL Connection Failed");
        console.log(err.message);
    });
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});