const db = require("../config/db");

console.log("ATTENDANCE CONTROLLER LOADED");

// ================= ADD ATTENDANCE =================

exports.addAttendance = async (req, res) => {
console.log("ADD API HIT");
console.log(req.body);
    const {
        employee_id,
        attendance_date,
        check_in,
        check_out,
        status,
        remarks
    } = req.body;

    try {

        await db.execute(
            `INSERT INTO attendance
            (
                employee_id,
                attendance_date,
                check_in,
                check_out,
                status,
                remarks
            )
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                employee_id,
                attendance_date,
                check_in,
                check_out,
                status,
                remarks
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Attendance Added Successfully"
        });

    } catch (err) {

    console.log("============== ADD ERROR ==============");
    console.log(err);
    console.log(err.code);
    console.log(err.errno);
    console.log(err.sqlMessage);
    console.log(err.sql);
    console.log("=======================================");

    return res.status(500).json({
        success: false,
        error: err.message
    });

}
};
// ================= GET ATTENDANCE =================

exports.getAttendance = async (req, res) => {

    try {

        const [rows] = await db.execute(`
            SELECT
    a.id,
    a.employee_id,
    e.full_name,
    a.attendance_date,
    a.check_in,
    a.check_out,
    a.status,
    a.remarks
FROM attendance a
LEFT JOIN employees e
ON a.employee_id = e.id
ORDER BY a.id DESC
        `);

        return res.status(200).json({
            success: true,
            count: rows.length,
            attendance: rows
        });

    } catch (err) {

        console.log("GET ATTENDANCE ERROR:", err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }


};
// ================= UPDATE ATTENDANCE =================

exports.updateAttendance = async (req, res) => {

    const { id } = req.params;

    const {
        employee_id,
        attendance_date,
        check_in,
        check_out,
        status,
        remarks
    } = req.body;

    try {

        const [result] = await db.execute(
            `UPDATE attendance
             SET
                employee_id = ?,
                attendance_date = ?,
                check_in = ?,
                check_out = ?,
                status = ?,
                remarks = ?
             WHERE id = ?`,
            [
                employee_id,
                attendance_date,
                check_in,
                check_out,
                status,
                remarks,
                id
            ]
        );
        if (result.affectedRows === 0) {
    return res.status(404).json({
        success: false,
        message: "Attendance not found"
    });
}
console.log("UPDATE SUCCESS");
console.log(result);
        return res.status(200).json({
            success: true,
            message: "Attendance Updated Successfully"
        });

    } catch (err) {

    console.log("============== ERROR ==============");
    console.log(err);
    console.log(err.code);
    console.log(err.errno);
    console.log(err.sqlMessage);
    console.log(err.sql);
    console.log("===================================");

    return res.status(500).json({
        success: false,
        error: err.message
    });

}

};
// ================= DELETE ATTENDANCE =================

exports.deleteAttendance = async (req, res) => {

    const { id } = req.params;

    try {

        const [result] = await db.execute(
    "DELETE FROM attendance WHERE id = ?",
    [id]
);

if (result.affectedRows === 0) {
    return res.status(404).json({
        success: false,
        message: "Attendance not found"
    });
}

        return res.status(200).json({
            success: true,
            message: "Attendance Deleted Successfully"
        });

    } catch (err) {

        console.log("DELETE ATTENDANCE ERROR:", err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

};