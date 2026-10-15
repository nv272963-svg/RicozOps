const db = require("../config/db");

console.log("LEAVE CONTROLLER LOADED");

// ================= ADD LEAVE =================

exports.addLeave = async (req, res) => {

    const {
        employee_id,
        leave_type,
        start_date,
        end_date,
        total_days,
        reason
    } = req.body;

    try {

        await db.execute(
            `INSERT INTO leaves
            (
                employee_id,
                leave_type,
                start_date,
                end_date,
                total_days,
                reason
            )
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                employee_id,
                leave_type,
                start_date,
                end_date,
                total_days,
                reason
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Leave Applied Successfully"
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

};
// ================= GET LEAVES =================

exports.getLeaves = async (req, res) => {

    try {

        const [rows] = await db.execute(`
            SELECT
                l.id,
                e.full_name,
                l.leave_type,
                l.start_date,
                l.end_date,
                l.total_days,
                l.reason,
                l.status,
                l.applied_on
            FROM leaves l
            LEFT JOIN employees e
                ON l.employee_id = e.id
            ORDER BY l.id DESC
        `);

        return res.status(200).json({
            success: true,
            count: rows.length,
            leaves: rows
        });

    } catch (err) {

        console.log("GET LEAVES ERROR:", err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

};
// ================= UPDATE LEAVE =================

exports.updateLeave = async (req, res) => {

    const { id } = req.params;

    const {
        leave_type,
        start_date,
        end_date,
        total_days,
        reason,
        status
    } = req.body;
console.log(req.body);
    try {

        await db.execute(
            `UPDATE leaves
             SET
                leave_type=?,
                start_date=?,
                end_date=?,
                total_days=?,
                reason=?,
                status=?
             WHERE id=?`,
            [
                leave_type,
                start_date,
                end_date,
                total_days,
                reason,
                status,
                id
            ]
        );

        return res.status(200).json({
            success: true,
            message: "Leave Updated Successfully"
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

};
// ================= DELETE LEAVE =================

exports.deleteLeave = async (req, res) => {

    const { id } = req.params;

    try {

        await db.execute(
            "DELETE FROM leaves WHERE id = ?",
            [id]
        );

        return res.status(200).json({
            success: true,
            message: "Leave Deleted Successfully"
        });

    } catch (err) {

        console.log("DELETE LEAVE ERROR:", err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

};
// ================= APPROVE / REJECT LEAVE =================

exports.approveLeave = async (req, res) => {

    const { id } = req.params;

    const { status, approved_by } = req.body;

    try {

        await db.execute(
            `UPDATE leaves
             SET
                status = ?,
                approved_by = ?,
                approved_at = NOW()
             WHERE id = ?`,
            [
                status,
                approved_by,
                id
            ]
        );

        return res.status(200).json({
            success: true,
            message: `Leave ${status} Successfully`
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

};