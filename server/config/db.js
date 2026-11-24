const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

console.log("CERT PATH:", path.join(__dirname, "../isrgrootx1.pem"));

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ssl: {
  ca: fs.readFileSync(path.join(__dirname, "../isrgrootx1.pem")),
  minVersion: "TLSv1.2",
  rejectUnauthorized: true
},

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test Connection
(async () => {
  try {
    const conn = await db.getConnection();
    console.log("✅ MySQL Connected Successfully");
    conn.release();
  } catch (err) {
    console.error("❌ MySQL Connection Error:", err);
  }
})();

module.exports = db;