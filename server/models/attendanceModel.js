const db = require("../config/db");

module.exports = db;
const db = require("../config/db");

// Get All Attendance
async function getAllAttendance() {

    const [rows] = await db.query(`
        SELECT
            attendance.id,
            employees.full_name AS employee,
            attendance.attendance_date,
            attendance.check_in,
            attendance.check_out,
            attendance.status,
            attendance.remarks
        FROM attendance
        INNER JOIN employees
            ON attendance.employee_id = employees.id
        ORDER BY attendance.attendance_date DESC
    `);

    return rows;
}

module.exports = {
    getAllAttendance
};